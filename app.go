package main

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/flipfloppy1/quDnD-wiki/mutations"
	"github.com/flipfloppy1/quDnD-wiki/skills"
)

func main() {
	http.HandleFunc("/api/skills/{skillname}", skills.ServeSkills)
	http.HandleFunc("/api/skills", skills.ServeSkills)
	http.HandleFunc("/api/mutations/{mutationname}", mutations.ServeMutations)
	http.HandleFunc("/api/mutations", mutations.ServeMutations)
	httpfs := http.FileServer(http.Dir("dist/browser"))
	http.HandleFunc("/", http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		path := filepath.Join("dist", "browser", req.URL.Path)
		_, err := os.Stat(path)
		if err != nil {
			http.ServeFile(res, req, filepath.Join("dist", "browser", "index.html"))
		} else {
			httpfs.ServeHTTP(res, req)
		}
	}))

	http.ListenAndServe(":8080", nil)
}
