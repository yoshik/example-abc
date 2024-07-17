const chokidar = require("chokidar");
const exec = require("child_process").exec;
const log = (err, stdout, stderr) => {
	if (err) console.log(err);
	if (stdout) console.log(stdout);
	if (stderr) console.log(stderr);
};

var prev = "";
chokidar.watch("./src").on("all", (event, path) => {
	console.log(event, path);
	if (path == prev) {
		// フォーマッター自体の保存と連打は無視する
		setTimeout(() => (prev = ""), 5000);
	} else {
		prev = path;
	}
	if (event === "change") {
		if (path.endsWith(".tsx") || path.endsWith(".ts")) {
			exec("npx @biomejs/biome format --write " + path, log);
		}
		if (path.endsWith(".css")) {
			exec("npx prettier -w " + path, log);
			exec("npx stylelint " + path + " --fix", log);
		}
	}
});
