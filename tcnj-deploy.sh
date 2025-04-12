#!/usr/bin/env bash

if [[ -d "$1" ]]; then
    read -p "This will overwrite everything in '~/www' with the contents of '$1'. Continue? (y/n) " -n 1 -r
    echo
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Username: " -r username
        tar -c -C $1 . | gzip -2 | ssh -o ConnectTimeout=10 "$username@beauty.tcnj.edu" "rm -rf ~/www > /dev/null; mkdir -p ~/www; tar -zx -C ~/www; cd ~/www; find -type d -exec chmod 755 {} \;; find -type f -exec chmod 644 {} \;; echo; echo \"Deployment successful!\""
        
        if [[ $? -ne 0 ]]; then
            echo
            echo "Deployment failed!"
            echo "In order to use this command you must be connected to the TCNJ network or using a VPN."
            
            if [[ "$(uname)" == "Darwin" ]]; then
                echo "Mac VPN Tutorial: http://nts.pages.tcnj.edu/files/2014/08/PAN-VPN-Instructions.pdf"
            elif [[ "$(expr substr $(uname -s) 1 5)" == "Linux" ]]; then
                echo "Linux VPN Tutorial: https://tomeraberba.ch/html/post/tcnj-linux-vpn.html"
            else
                echo "Windows VPN Tutorial: http://nts.pages.tcnj.edu/files/2014/08/PAN-VPN-Instructions.pdf"
            fi
        fi
    fi
else
   echo "Usage: tcnj-deploy <directory>"
fi
