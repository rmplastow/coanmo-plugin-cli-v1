import "./CoAnMoPluginCli.css";
var CoAnMoPluginCli = /** @class */ (function () {
    function CoAnMoPluginCli(name, version, stdinSelector, stdoutSelector, doc) {
        var _this = this;
        this.name = name;
        this.version = version;
        this.actions = [];
        this.$stdin = doc.querySelector(stdinSelector);
        this.$stdout = doc.querySelector(stdoutSelector);
        this.log("CoAnMoPluginCli()");
        if (this.$stdin)
            this.$stdin.addEventListener("keydown", function (evt) {
                if (_this.$stdin && evt.key === "Enter")
                    _this.run(_this.$stdin.value);
            });
    }
    CoAnMoPluginCli.prototype.addActions = function (actions) {
        var _this = this;
        actions.forEach(function (action) { return _this.actions.push(action); });
    };
    CoAnMoPluginCli.prototype.focusOnInput = function () {
        if (this.$stdin)
            this.$stdin.focus();
    };
    CoAnMoPluginCli.prototype.log = function (message) {
        if (!this.$stdout)
            return;
        this.$stdout.innerHTML += "\n" + message;
        this.$stdout.scroll(0, 999999);
    };
    CoAnMoPluginCli.prototype.run = function (command) {
        if (!this.$stdin)
            return;
        var _a = command.trim().split(/\s+/), actionName = _a[0], args = _a.slice(1);
        var actionNameLc = actionName.toLowerCase(); // because, iPad keyboard
        if (actionName === "") {
            this.$stdin.value = "";
            return this.log(">");
        }
        var action = this.actions.find(function (actn) { return actn.name === actionNameLc; });
        if (!action)
            return this.log("No such action '" + actionNameLc + "' - try 'help'");
        this.log("> " + actionNameLc + " " + args.join(' '));
        this.$stdin.value = "";
        this.log(action.fn(args, {
            actions: this.actions,
            name: this.name,
            version: this.version
        }));
    };
    return CoAnMoPluginCli;
}());
export { CoAnMoPluginCli };
//# sourceMappingURL=CoAnMoPluginCli.js.map