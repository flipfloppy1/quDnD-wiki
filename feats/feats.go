package feats

import (
	"encoding/json"
	"maps"
	"net/http"
	"slices"
	"strings"

	"github.com/flipfloppy1/quDnD-wiki/utils"
	"github.com/flipfloppy1/quDnD/src/statblock"
)

func ServeFeats(res http.ResponseWriter, req *http.Request) {
	feat := req.PathValue("featname")
	if feat == "" {
		feats := slices.Collect(maps.Values(statblock.Feats))
		slices.SortFunc(feats, func(a statblock.Feat, b statblock.Feat) int {
			return strings.Compare(a.Name, b.Name)
		})

		bytes, _ := json.Marshal(struct {
			Feats []statblock.Feat `json:"feats"`
		}{feats})
		res.Header().Add("Content-Type", "application/json")
		res.WriteHeader(200)
		res.Write(bytes)
		return
	}

	featData, ok := statblock.Feats[feat]
	if !ok {
		utils.HttpReportError(res, "Feat not found", 404)
		return
	}

	bytes, _ := json.Marshal(featData)
	res.Header().Add("Content-Type", "application/json")
	res.WriteHeader(200)
	res.Write(bytes)
}
