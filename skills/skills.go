package skills

import (
	"encoding/json"
	"maps"
	"net/http"
	"slices"
	"strings"

	"github.com/flipfloppy1/quDnD-wiki/utils"
	"github.com/flipfloppy1/quDnD/src/statblock"
)

func ServeSkills(res http.ResponseWriter, req *http.Request) {
	skill := req.PathValue("skillname")
	if skill == "" {
		skills := slices.Collect(maps.Values(statblock.Feats))
		slices.SortFunc(skills, func(a statblock.Feat, b statblock.Feat) int {
			return strings.Compare(a.Name, b.Name)
		})

		bytes, _ := json.Marshal(struct {
			Skills []statblock.Feat `json:"skills"`
		}{skills})
		res.Header().Add("Content-Type", "application/json")
		res.WriteHeader(200)
		res.Write(bytes)
		return
	}

	skillData, ok := statblock.Feats[skill]
	if !ok {
		utils.HttpReportError(res, "Skill not found", 404)
		return
	}

	bytes, _ := json.Marshal(skillData)
	res.Header().Add("Content-Type", "application/json")
	res.WriteHeader(200)
	res.Write(bytes)
}
