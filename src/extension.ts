'use strict'

import { ExtensionContext, extensions, languages, window } from 'vscode';
import { TemplatePathProvider } from './providers/definitionProvider'
import {
    DjangoAdminCompletionItemProvider,
    DjangoFormCompletionItemProvider,
    DjangoManagerCompletionItemProvider,
    DjangoMigrationCompletionItemProvider,
    DjangoModelCompletionItemProvider,
    DjangoPythonCompletionItemProvider,
    DjangoViewCompletionItemProvider,
    DjangoTemplatetagsCompletionItemProvider,
    DjangoUrlCompletionItemProvider,
} from './completions/completionItemProvider'
import { postInitHook, SnippetProvider } from './utils';

export async function activate(context: ExtensionContext): Promise<void> {
    // Activate VS Code's built-in HTML language features for django-html
    // See https://github.com/microsoft/vscode/issues/160585
    const htmlExtension = extensions.getExtension('vscode.html-language-features')
    if (htmlExtension) {
        await htmlExtension.activate()
    } else {
        const output = window.createOutputChannel('Django')
        output.appendLine('Warning: Could not find vscode.html-language-features. HTML language support will be limited.')
    }

    const snippetProvider = new SnippetProvider(context.extensionUri);

    const definitions = new TemplatePathProvider()
    context.subscriptions.push(languages.registerDefinitionProvider(definitions.selector, definitions))

    const djangoPythonSnippets = new DjangoPythonCompletionItemProvider(snippetProvider)
    context.subscriptions.push(languages.registerCompletionItemProvider(djangoPythonSnippets.selector, djangoPythonSnippets))

    const djangoAdminSnippets = new DjangoAdminCompletionItemProvider(snippetProvider)
    context.subscriptions.push(languages.registerCompletionItemProvider(djangoAdminSnippets.selector, djangoAdminSnippets))

    const djangoFormSnippets = new DjangoFormCompletionItemProvider(snippetProvider)
    context.subscriptions.push(languages.registerCompletionItemProvider(djangoFormSnippets.selector, djangoFormSnippets))

    const djangoManagerSnippets = new DjangoManagerCompletionItemProvider(snippetProvider)
    context.subscriptions.push(languages.registerCompletionItemProvider(djangoManagerSnippets.selector, djangoManagerSnippets))

    const djangoMigrationSnippets = new DjangoMigrationCompletionItemProvider(snippetProvider)
    context.subscriptions.push(languages.registerCompletionItemProvider(djangoMigrationSnippets.selector, djangoMigrationSnippets))

    const djangoModelSnippets = new DjangoModelCompletionItemProvider(snippetProvider)
    context.subscriptions.push(languages.registerCompletionItemProvider(djangoModelSnippets.selector, djangoModelSnippets))

    const djangoViewSnippets = new DjangoViewCompletionItemProvider(snippetProvider)
    context.subscriptions.push(languages.registerCompletionItemProvider(djangoViewSnippets.selector, djangoViewSnippets))

    const djangoTemplatetagsSnippets = new DjangoTemplatetagsCompletionItemProvider(snippetProvider)
    context.subscriptions.push(languages.registerCompletionItemProvider(djangoTemplatetagsSnippets.selector, djangoTemplatetagsSnippets))

    const djangoUrlSnippets = new DjangoUrlCompletionItemProvider(snippetProvider)
    context.subscriptions.push(languages.registerCompletionItemProvider(djangoUrlSnippets.selector, djangoUrlSnippets))

    postInitHook();
}
