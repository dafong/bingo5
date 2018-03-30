#!/bin/sh
[[ $# -lt 1 ]] && echo "useage sh server.sh start|stop" && exit;
cmd=$1

case $cmd in
    start)
       npm run dev
    ;;
    stop)
        kill $(ps aux | grep 'webpack' | awk '{print $2}')
    ;;
    *)
        echo "$cmd is not supported!"
    ;;
esac
