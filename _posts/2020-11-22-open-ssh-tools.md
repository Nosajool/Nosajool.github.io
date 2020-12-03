---
title: "Open SSH tools"
layout: post
published: true
---

I've been using tools from [OpenSSH](https://www.openssh.com/) as a part of my workflow for quite awhile but haven't really
read the documentation in depth. Time to take a look.

OpenSSH consists of the following tools:

* `ssh`
- `scp`
- `sftp`
- `ssh-add`
- `ssh-keysign`
- `ssh-keyscan`
- `ssh-keygen`
- `sshd`
- `sftp-server`
- `ssh-agent`

I've used `ssh`, `scp`, `sftp`, `ssh-add`, `ssh-keygen` at work but haven't had to use the other 5 yet.

## ssh

The SSH client program for logging into a remote machine and executing commands on the remote host.

`ssh -i ~/.ssh/my-ec2-key.pem user@my-ec2`

This command will connect to the EC2 instance using the private key stored in `~/.ssh/my-ec2-key.pem`.

## scp

`scp` is used to copy files between hosts on a network using `ssh` for data transfer.

`scp neo@remoteserver:/tmp/picture_to_transfer.png .`

This command will retrieve the file in `/tmp/picture_to_transfer.png` from the `remoteserver` and copy it to the current directory.

## sftp

`sftp` is a file transfer program over `ssh`. While `scp` is non-interactive, `SFTP` is interactive, allowing you to run commands like `ls`, `cd`, `put` `get` to move around the remote directory and add or get files.

`sftp> put /tmp/my_file.txt`

This will upload the `/tmp/my_file.txt` to the current directory on the remote host.

## ssh-add

`ssh-add` adds private key identities to the OpenSSH authentication agent.

By default without arguments, it will add the following files to the agent:

* ~/.ssh/id_rsa
- ~/.ssh/id_dsa
- ~/.ssh/id_ecdsa
- ~/.ssh/id_ecdsa_sk
- ~/.ssh/id_ed25519
- ~/.ssh/id_ed25519_sk

## ssh-keysign

This program is used by `ssh` to access the local host keys and generate the digital signature required during host-based authentication.

Host-based authentication means that the host is authenticated regardless of which user is logged on.

## ssh-keyscan

`ssh-keyscan` is used to gather SSH public host keys from servers.

`ssh-keyscan -t rsa hostname`

This will print the RSA host key for the machine `hostname`.

## ssh-keygen

This is the utility program to generate, manage and convert authentication keys for ssh.

`ssh-keygen -t rsa -b 4096`

This command will generate private and public authentication keys using 4096 bit RSA keys.

## sshd

This is the ssh daemon server program that listens for connections from clients.

`sshd -f /etc/ssh/sshd_config -g 15`

Start the ssh daemon using the `/etc/ssh/sshd_config` configuration and give clients 15 seconds to authenticate.

## sftp-server

This is the sftp server program to accept client connections using `sftp`.

It is a subsystem that is generally started alongside the ssh server daemon `sshd` although it can be [started on its own](https://serverfault.com/questions/354615/allow-sftp-but-disallow-ssh).

## ssh-agent

`ssh-agent` is a program to hold private keys used for public key authentication. These will be used by `ssh`.

``eval `ssh-agent` ``

Will start the agent.

`ssh-add -l` to list private keys currently accessible to the agent.

`ssh-add ~/.ssh/my-private-key` to add a private key to the agent.

**SSH Agent Forwarding** is when an `ssh` client allows an ssh server to use the local `ssh-agent` on the server the user logs into as if it was local there. This implements single sign-on.

A common use-case of this is the scenario where you have instances in a private subnet with the only inbound traffic being allowed from a **bastion host** or a "jump box" in a public subnet.

If you want to ssh into these private instances, you would need to use ssh agent forwarding so that you can first ssh into the bastion host and then ssh into the private instance. The avoids having to copy our private key to the bastion host, a move that would have security problems if the bastion host is compromised.

`ssh -A ec2-user@35.171.53.56` to ssh into an instance using agent forwarding.

`ssh-add -l` to verify that the private key has been added to the instance's `ssh-agent`.
