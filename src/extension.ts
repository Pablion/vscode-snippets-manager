import * as vscode from "vscode";
import { CodeSnippetsEditor } from "./CodeSnippetsEditor";
import createSnippet from "./commands/createSnippet";
import createSnippetTo from "./commands/createSnippetTo";
import deleteSnippet from "./commands/deleteSnippet";
import editSnippet from "./commands/editSnippet";
import showEditor from "./commands/showEditor";
import showSnippet from "./commands/showSnippet";
import showSource from "./commands/showSource";
import workbenchActionOpenSnippets, {
  workbenchActionOpenSnippetsId,
} from "./commands/workbenchActionOpenSnippets";
import { setContext } from "./share";
import ExtensionSnippetsExplorerView from "./views/ExtensionSnippetsExplorerView";
import { registerHelpAndFeedbackView } from "./views/helpAndFeedbackView";
import refreshAllView from "./views/refreshAllView";
import UserSnippetsExplorerView from "./views/UserSnippetsExplorerView";
import WorkspaceSnippetsExplorerView from "./views/WorkspaceSnippetsExplorerView";

export const log = vscode.window.createOutputChannel("Snippets Manager");

export function activate(context: vscode.ExtensionContext) {
  setContext(context);

  new WorkspaceSnippetsExplorerView(context);

  new UserSnippetsExplorerView(context);

  new ExtensionSnippetsExplorerView(context);

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "snippetsmanager.createSnippet",
      async (prefix?: string) => {
        return createSnippet(prefix);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "snippetsmanager.createSnippetTo",
      async (prefix?: string, uri?: vscode.Uri) => {
        return createSnippetTo(prefix, uri);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      workbenchActionOpenSnippetsId,
      workbenchActionOpenSnippets
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "_snippetsmanager.deleteSnippet",
      (snippet) => {
        deleteSnippet(snippet);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "_snippetsmanager.editSnippet",
      (snippet) => {
        editSnippet(snippet);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "_snippetsmanager.showSnippet",
      (snippet) => {
        showSnippet(snippet);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("snippetsmanager.refresh", () => {
      refreshAllView();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("snippetsmanager.showSource", async () => {
      return showSource();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("snippetsmanager.showEditor", async () => {
      return showEditor();
    })
  );

  context.subscriptions.push(CodeSnippetsEditor.register(context));

  registerHelpAndFeedbackView(context);
}

export function deactivate() {}
