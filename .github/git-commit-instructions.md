# écris toujours les commit message en français
+ utilise un ton concis et direct
+ utilise les syntaxes feat: fix: chore: refactor: docs: test: style:
+ commence toujours par une de ces syntaxes
+ Au lieu de dire ajout de styles dit plutôt modif css

+ ne mentionne pas forcément dans quel fichier on fait les modifs
+ quand une importation inutile est supprimée, dit 'clean imports' et ne mentionne pas forcément les fichiers, on s'en fout.
+ quand on a nettoyé des logs, dit 'clean log' et ne mentionne pas forcément les fichiers, on s'en fout.
+ quand on a nettoyé des commentaires, dit 'clean comments' et ne mentionne pas forcément les fichiers, on s'en fout.
+ quand les modifs portent sur des modifications d'orthographe dis juste "fix typo"

# exceptions

+ si tu fais une modif sur un fichier de config, tu peux le mentionner
+ si tu fais des modifs sur git-commit-instructions, mentionne "Copilot config :"
+ si tu captes que j'ai juste ajouté ou modifié des commentaires dis "code comments"
+ si j'ai juste changé la version du package.json écrit "package.json version : x.x.x"
+ si je modifie uniquement un seul fichier mentionne son nom