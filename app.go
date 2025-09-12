package main

import (
	"net/http"
	"os"
	"path/filepath"

	"github.com/flipfloppy1/quDnD-wiki/feats"
)

func main() {
	http.HandleFunc("/api/feats/{featname}", feats.ServeFeats)
	http.HandleFunc("/api/feats", feats.ServeFeats)
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
