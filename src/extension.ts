'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as crypto from 'crypto';
import * as path from 'path';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    var ﾅｲｻﾞー = vscode.commands.registerTextEditorCommand(
                'extension.IncludeGuard',
                (ｴﾃﾞｨﾀー, ｴﾃﾞｨｯﾄ) =>
                {

                    let sha512 = crypto.createHash('md5');
                    sha512.update(ｴﾃﾞｨﾀー.document.fileName);
                    let hash = sha512.digest('hex').toUpperCase();
                    const p = path.parse(ｴﾃﾞｨﾀー.document.fileName);
                    let fn = `_${p.name.replace(/[\.\-]/g, '_').toUpperCase()}${p.ext.replace(/[\.\-]/g, '_').toUpperCase()}_`;
                    fn += hash.substr(0, 8) +
                        "_" +
                        hash.substr(8, 4) +
                        "_" +
                        hash.substr(12, 4) +
                        "_" +
                        hash.substr(16, 4) +
                        "_" +
                        hash.substr(20, 12) +
                        "_";
                    const def = `#ifndef ${fn}\n#define ${fn}\n`

                    //vscode.window.showInformationMessage(`${ｴﾃﾞｨﾀー.document.fileName} -> ${fn}`);
                    ｴﾃﾞｨｯﾄ.insert(new vscode.Position(0, 0), def);
                    ｴﾃﾞｨｯﾄ.insert(new vscode.Position(ｴﾃﾞｨﾀー.document.lineCount+1, 0), `#endif /* ${fn} */\n`);
                });

    context.subscriptions.push(ﾅｲｻﾞー);
}

// this method is called when your extension is deactivated
export function deactivate() {
}