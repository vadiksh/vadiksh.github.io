# About Continuous Integration

## BitBucket

To start a project, please request a bitbucket repository and Jenkins jobs from any administrator. Project names should contain at least the client name and year, and if multiply campaigns a year also either numbering or an identifier per campaign.

** GOOD **
	
	client-2017
	client-2017-2
	client-2017-campaign

** BAD **

	campaign
	campaign-2017
	gobbledygoock
	gobbledygoock-from-outer-space

## Jenkins

** Jenkins is only available internally. Use either a VPN or be connected to the network. **

Continuous integration happens through Jenkins. Request a new job from an administrator. To begin with, for safety, we would recommend only asking for a development job. This development job should have the same name as the repo, but prefixed with `dev-`, while the production job is prefixed with `prd-`

Since switching to the new servers the destination address for development (which are publicly available productions sites) is:

	prd-nfs-04:/nfs/tcpnewone/development/

Our actually final destination address - our full production server - has the following address:

	prd-web-16:/var/www/cnnadfeat/docroot/

Everything after these addresses will a the local path to the final location. Remember that Jenkins can only make sub folders where folders already exist, so if you want to add a new year folder you first need to run an empty job that will place an empty page in a newly-minted folder before you can start pushing them into that year folder.

The following code is the default Jenkins configuration:

	chgrp -R release $WORKSPACE/* && chmod -R g+w $WORKSPACE/*

	rsync --exclude=".git" --exclude="Gulpfile.js" --exclude="node_modules" --exclude="sass" --exclude="package.json" --exclude="README.md" --delete -av -e ssh $WORKSPACE/* {{ADDRESS}}{{PATH}}

You can exclude other files and folders you do not want pushed be adding more `--exclude="{{PATH}}"` rules. If you want to push a specific folder in the repository, you can do that by amending the `WORKSPACE/` path. `WORKSPACE` refers to the root of your repository.

When configuring jenkins, make sure to change the repository name to the correct repository. Jenkins _will_ tell you if the repo is incorrect, inaccessible or not found.

Ask for a production job as close to actual production as possible. Don't forget that our server caches pages, so if you build to many times your changes might take a while to propagate.