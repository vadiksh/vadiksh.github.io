# Tools

## Download & Install

### Vagrant

Download an installer at https://www.vagrantup.com/

### Virtual Box

Download an installer at https://www.virtualbox.org/wiki/Downloads

### NodeJS

Download an installer at https://nodejs.org/en/

Please make sure the version of Node.js you install on your system is lower than 7, as for now we require some features that haven’t been ported to the latest yet. If you install the latest we can resolve it using Nove Version Manager, but that requires quite a bit of setup.

## Basics

For most of the setup, and quite a bit when developing and deploying, we will make use of the Terminal on maxOS to automate our workflow. So here is a quick primer on using the Terminal. The first word typed is always the program it needs to run, the others are passed into the program as arguments and keys for those arguments. Keys are susually prefixed with one or two dashes (with the two dashes usually being a shorthand for a long worded key). Example:

	open -a bbedit ./
	
This will open the current folder in the application (-a) bbedit. If you want the manual for any built-in feature, you can use the man program, followed by the program name:

	man open
	
A couple of terminal basics:

	/ This path is your computer root (aka My Computer)
	~ This path is your user root (aka your personal Home folder)
	../ This means ‘one folder up from the current folder’
	./ This means ‘the current folder’

The main way to manoever is using the following two commands: `ls` and `cd`. `ls` will list out the path passed to it, or the current folder so you can see the files available. `cd` will change your directory, so to move to another folder you can use cd followed by the path you want to go to. After installing Oh My Zsh! both of these will automatically used when it knows you didn’t mean anything else. You can always press tab to autocomplete whatever your typing where avilable.

       /Applications/Utilities/terminal.app

If you have any issues running the commands below you can use the `sudo` command to login as a Super User (where IT allows it). Just prepend sudo to a command and enter your password when prompted and press enter (you will get no feedback while typing your password, so be warned).

## Oh My ZSH!

Lets start by installing Oh My Zsh!
Please note there are no line breaks in terminal, and this is one continous sentence.

	sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

At this point the system will probably prompt you to install the Xcode Developer Tools. Continue this installation and afterwards run the command above again. After done, restart your Terminal. If nothing has visually changed, restart your system. Oh My ZSH should now be installed and your terminal a little bit easier to use.

## http://localhost:4567

First of, create a new folder where we will store all repositories. My suggestion would be to place it in your Home folder, like this:
	
	~/Repositories/
	
You can make this folder using terminal with this command:

	mkdir ~/Repositories/
	
Copy the following two files into this folder:
	
	Vagrantfile
	bootstrap.sh

Then go to the folder in your Terminal and type:
	
	vagrant up
 
A whole bunch of commands will wizz by, showing the install of a box (in Virtualbox) and the provisioining of this box with certain setup requirements listed in bootstrap.sh. Once this is done, you can go to the following address in your browser to view the Repositories folder as if it were a web server:

	http://localhost:4567
	
When you are done and have no need for the server anymore, simply type the following command when in the folder or subfolder of the folder containing the Vagrantfile:
	
	vagrant halt
	
## Gulp

First of, install the Gulp CLI (command line interface) by running the following command:
	
	npm install --global gulp-cli
	
Any repository that contains a Gulpfile.js and a package.json can installl the workflow tools by running the following command when inside the folder that contains both files:

	npm install
	
The following gulp commands are available using our Gulpfile:

	$ gulp watch
	$ gulp css
	$ gulp js
	$ gulp compile
	$ gulp man

Use the `$ gulp man` command for more information. For more information, see `About Gulp`.

## GIT

Git is used the version control system we use. Our sites are all stored in Repositories that track changes to files and allow us to revert to older version where necessary. These repositories are then taken wholesale and pushed to our final servers in the build stage. If you have built the Xcode Developer Tools you will already have everything necessary for git. Before setup, however, there is one more file to create to make sure the repository does not get clogged with system files or unecessarily large files. Start by entering the following command:

	~touch ~/.gitignore_global && open ~/.gitignore_global


This will create a hidden file (hence the . before the filename) at your users root and open it. Inside this file, copy the contents of the `gitignore_global` file in our setup data. Save the file and close whatever was used to edit it. Now enter the following command in terminal:
	
	git config --global core.excludesfile ~/.gitignore_global
	
Any file matching any of the string inside that file will be ignored. This includes `ZIP` files, as well as system files like `.DS_Store` and any folder containing the word `assets`.

## BitBucket
After logging in to BitBucket you will be able to select any repository you have been given access to. In the overview tab you should find an HTTPS url for the repository. It should look something like the following:

	https://[username]@bitbucket.org/turnercommercialproductions/[repo].git

In terminal you can pull the repository to your computer initially by using the following command:
	
	git clone [url from above]

The first time you will be asked to enter your credentials for Bitbucket. After that the system should have saved them.

## Pushing and Pulling

To use git we only need to know a couple of commands. The first one is probably the most important. When in a folder use the following command to update you repository to the latest version:
	
	git pull origin master

Once you made changes to files and you are happy, you can commit them as final changes to our system using the following command (be sure to enter a nice descriptive message about the changes so reverting to the right version is made easier):

	git commit -am “[describe your changes here]”

Once you have commited your changes, all that remains is pushing them back into our repository with:
	
	git push origin master

