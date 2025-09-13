package abilities

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
	ability := req.PathValue("abilityname")
	if ability == "" {
		abilities := slices.Collect(maps.Values(statblock.Abilities))
		slices.SortFunc(abilities, func(a statblock.Ability, b statblock.Ability) int {
			return strings.Compare(a.Id, b.Id)
		})

		bytes, _ := json.Marshal(struct {
			Abilities []statblock.Ability `json:"abilities"`
		}{abilities})
		res.Header().Add("Content-Type", "application/json")
		res.WriteHeader(200)
		res.Write(bytes)
		return
	}

	abilityData, ok := statblock.Abilities[ability]
	if !ok {
		utils.HttpReportError(res, "Ability not found", 404)
		return
	}

	bytes, _ := json.Marshal(abilityData)
	res.Header().Add("Content-Type", "application/json")
	res.WriteHeader(200)
	res.Write(bytes)
}
