import { Command, flags } from "@oclif/command";
import { Input } from "@oclif/command/lib/flags";
import * as fs from "fs-extra";
import cli from "cli-ux";
import * as inquirer from "inquirer";
import path = require("path/posix");

export default class Init extends Command {
  static description = "create a new plugin project";

  static examples = [
    `$ rubick hello
hello world from ./src/hello.ts!
`,
  ];

  static flags: Input<any> = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "projectName" }];

  async run() {
    cli.styledHeader("🪄 创建一个酷酷的插件  \n");

    const { args, flags } = this.parse(Init);

    let responses = await inquirer.prompt([
      {
        name: "type",
        message: "你要创建的是哪种插件？",
        type: "list",
        choices: [{ name: "系统插件(Adapter)" }, { name: "普通插件(Plugin)" }],
      },
    ]);

    const projectName = args.projectName;
    const projectPath = path.resolve(projectName);

    if (!(await cli.confirm(`在 ${projectPath} 目录生成项目(y/n) `)))
      cli.exit();

    if (projectPath !== undefined) {
      if (!fs.pathExistsSync(projectPath)) await fs.mkdir(projectPath);
    }

    switch (responses.type) {
      case "系统插件(Adapter)":
        cli.styledHeader("🧭 系统插件是为 rubick 提供底层能力的插件拓展  \n");
        await adapterInit(projectPath);
        break;

      default:
        cli.log(`${responses.type} 现在还未支持哦`);
        cli.exit();
        break;
    }
  }
}

const adapterInit = async (projectPath: string) => {
  const pluginName = await cli.prompt("插件名称");
  const description = await cli.prompt("介绍");
  const author = await cli.prompt("作者");
  const pluginJSON = {
    pluginName,
    author,
    description,
    main: "src/index.ts",
    version: "0.0.0",
    logo: "logo.png",
    name: `rubick-adapter-${pluginName}`,
    features: [],
  };

  const packageJSON = {
    name: `rubick-adapter-${pluginName}`,
    description: "rubick cli",
    version: "0.0.0",
    author,
    main: "src/index.ts",
    scripts: {
      build: "tsc",
    },
    files: ["dist"],
  };

  const tsconfigJSON = {
    compilerOptions: {
      target: "ESNext",
      lib: ["ESNext", "DOM"],
      rootDir: ".",
      module: "commonjs",
      declaration: true,
      sourceMap: true,
      outDir: "dist",
      skipLibCheck: true,
      isolatedModules: true,
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      moduleResolution: "Node",
    },
    include: ["src/**/*"],
  };

  cli.action.start("正在生成项目...");
  await fs.writeJSON(path.resolve(projectPath, "plugin.json"), pluginJSON, {
    spaces: 2,
  });
  await fs.writeJSON(path.resolve(projectPath, "package.json"), packageJSON, {
    spaces: 2,
  });
  await fs.writeJSON(path.resolve(projectPath, "tsconfig.json"), tsconfigJSON, {
    spaces: 2,
  });

  await fs.writeFile(
    path.resolve(projectPath, "README.md"),
    `# ${pluginName}\n\n${description}`
  );

  await fs.mkdir(path.resolve(projectPath, "src"));
  await fs.writeFile(
    path.resolve(projectPath, "src", "index.ts"),
    `/**
 * ${description}
 */
export default class ${pluginName} {
  opt: object

  constructor(opt: {}) {
    this.opt = opt
  }

  async start() {}

  async stop() {}

  async api() {}
}`
  );
  cli.action.stop();
};
