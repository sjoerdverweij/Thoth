# Thoth
FIRST: Thoth is a work in progress! Please review the "Known Issues" and "Can I help?" sections!

Are you tired of reading an article on the Interwebs and running into something like "the car weighs 3744 pounds" and have no idea how many kilos that is, or vice versa?

Thoth is the answer. It will seamlessly replace that wacky value, that is in the obviously "wrong" unit system, with a value that you understand. 
It will do so in-line, and do much more besides:

- You can choose to convert everything to metric, or everything to imperial.
- You can have Thoth add the "other" system in parentheses (for example: "1,250kg (2,756lb)").
- Thoth will, if you like, highlight the changes it makes.
- Thoth will, if you like, allow you to click on any changed value and get a pop-up showing the value in all units it knows about (very much a work in progress at the moment).
- Thoth is extremely tolerant of input formatting: it will recognize "1250kg", "1,250 kg", "1250 kilograms", but also things like "3 metric tons".
- Thoth has advanced ranging, where "1oz" would be transformed to grams, and "100oz" to kilograms (the functionality for that is fine, but I need help fine-tuning limits).

## Cool, how do I get it?

Thoth has not been submitted to Google yet. It is still pretty limited in what it converts, and what it matches on. I'd love your help fixing that,
see below.

So yes, sorry, until I feel it's good enough to submit to Google, you have to do developy things to get it to run.

1. Go to https://github.com/sjoerdverweij/Thoth
2. Click on the green Code button and select Download ZIP.
3. Once downloaded, extract the ZIP file to a local folder (for example: C:\Thoth).
4. In Chrome, open the three-dot main menu (in the top right of the window) and select Exensions => Manage Extensions.
5. In the top right of the tab that appears, toggle on "Developer mode" (if it isn't on already). NOTE: if you can't turn on Developer mode, and you see a message to the effect of
   "Browser extensions are managed by your organization", that means you are on a work PC and your IT department won't let you install Thoth.
6. Click "Load unpacked" in the top left of the tab.
7. Navigate to the folder you unpacked Thoth in, and click Select Folder.
8. Thoth should now be installed and running. You may have to refresh tabs that are already open to see it in action.
9. To change Thoth settings, click on the Extensions button in the Chrome toolbar, open the triple-dot dropdown next to Thoth, and select Options.

## Can I help?

Yes, please!

If you're not a programmer and want to help, it is invaluable to me if you just run the thing and provide feedback on the github page 
(pages that hang, missing conversions, et cetera).

If you are a programmer, you can do the above, or fix it yourself and add a PR. 

Either way, the Known Issues section would be an awesome place to start. And if you help, you WILL be credited.

## Known issues / TODO
THERE ARE A LOT OF MISSING UNIT MATCHES. PLEASE FEEL FREE TO LET ME KNOW AND/OR PR THEM.

The popup doesn't show conversions to all units within its class yet. It's what I want it to do, but there's a problem: I need to read that meaty units map from
localstorage from the client browser, or converse with the background worker to get it, and I haven't figured out how to do that yet in current versions of Chrome. 
Your challenge, should you choose to accept it, is to figure out how to do that before I do.

(The reason it is in localstorage is for speed, and also because I intend to at some point let the user customize it; for example cutover points and number of decimals.)

There are a LOT of missing unit matches. So PLEASE run the sucker and report/fix things it doesn't convert for some specific notation of "36%!=%%inChes". 
It doesn't really cost anything to add another wacky match in the units map. It's almost like I spent all the time normalizing the input down to one quick lookup for a reason;
I fully expect the units map to end up with an absolutely insane amount of wacky permutations.

## Nerd alert

If there is sufficient interest I do intend to throw this on Google Play at some point, for free. It'll be the minified version that is created under the build
folder that gets created by running `build.cmd`. If you'd like to try this out, you need `npm`, but the rest of the dependencies can just be done by running
`install-tools.cmd`. (Of course, if you run into anything with THAT, let me know).

You can participate with Notepad, vim, vi, whatever you like. Just download the source and muck around. I personally work with Visual Studio 2022 Community Edition, which
is free, and point it at the folder. Linting is crap, and I am seriously considering moving to TypeScript. If you feel like doing that bit, yes, I will love you forever.

Thoth is implemented as a forward-only stepper (no, not even a state machine). I will NOT switch to Regexes. Go look at the code and comments. 

A good point could be made to convert to a proper state machine, but that would be massively harder to maintain. Do NOT give me a PR with a full HTML ANTLR/YACC/whatever
grammar, I will reject it. If you feel you can do better with a full state machine, or with regexes, then feel free to roll your own extension.

If you are still reading this, thank you so much for your time. I hope that Thoth helps you, and if possible, that you can help Thoth. Regardless, again, thank you.