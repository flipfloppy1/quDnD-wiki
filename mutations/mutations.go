package mutations

import (
	"encoding/json"
	"maps"
	"net/http"
	"slices"
	"strings"

	"github.com/flipfloppy1/quDnD-wiki/utils"
	"github.com/flipfloppy1/quDnD/src/mutations"
)

func ServeMutations(res http.ResponseWriter, req *http.Request) {
	mutation := req.PathValue("mutationname")
	if mutation == "" {
		muts := slices.Collect(maps.Values(mutations.Mutations))
		slices.SortFunc(muts, func(a mutations.Mutation, b mutations.Mutation) int {
			return strings.Compare(a.Name, b.Name)
		})

		bytes, _ := json.Marshal(struct {
			Mutations []mutations.Mutation `json:"mutations"`
		}{muts})
		res.Header().Add("Content-Type", "application/json")
		res.WriteHeader(200)
		res.Write(bytes)
		return
	}

	mutationData, ok := mutations.Mutations[mutation]
	if !ok {
		utils.HttpReportError(res, "Ability not found", 404)
		return
	}

	bytes, _ := json.Marshal(mutationData)
	res.Header().Add("Content-Type", "application/json")
	res.WriteHeader(200)
	res.Write(bytes)
}
