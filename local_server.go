package main

import (
	"io"
	"net/http"
	"os"
	"os/exec"

	"github.com/go-chi/chi/v5"
)

func read(path string) []byte {
	f, err := os.Open(path)
	defer f.Close()
	if err != nil {
		return ([]byte("{\"error\": \"" + path + " can't read\"}"))
	} else {
		byteArray, _ := io.ReadAll(f)
		return (byteArray)
	}
}

func main() {
	r := chi.NewRouter()
	folder := "./build"
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		filename := "/index.html"
		w.Write(read(folder + filename))
	})

	r.Get("/*", func(w http.ResponseWriter, r *http.Request) {
		filename := r.URL.Path
		w.Write(read(folder + filename))
	})
	exec.Command("open", "http://localhost:4000").Start()
	http.ListenAndServe(":4000", r)
}
