git filter-branch --commit-filter '
if [ "$GIT_COMMITTER_NAME" = "hylcore" ] || [ "$GIT_COMMITTER_NAME" = "hylcore-V" ];
        then
                GIT_COMMITTER_NAME="techsaavy8784";
                GIT_AUTHOR_NAME="techsaavy8784";
                GIT_COMMITTER_EMAIL="blueskydev1205@gmail.com";
                GIT_AUTHOR_EMAIL="blueskydev1205@gmail.com";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD
