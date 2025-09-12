package utils

import (
	"encoding/json"
	"net/http"
)

func HttpReportError(res http.ResponseWriter, message string, statusCode int) {
	bytes, _ := json.Marshal(struct {
		Error string `json:"error"`
	}{message})
	res.Header().Add("Content-Type", "application/json")
	res.WriteHeader(statusCode)
	res.Write(bytes)
}
