# Thoth
Are you tired of reading an article on the Interwebs and running into something like "the car weighs 3744 pounds" and have no idea how many kilos that is, or vice versa?

Thoth is the answer. It will seamlessly replace that wacky value in the "wrong" unit system with the one you understand.

- You can choose to convert everything to metric, or everything to imperial.
- You can have Thoth add the "other" system in parentheses (for example: "1,250kg (2,756lb)").
- Thoth will, if you like, highlight the changes it makes.
- Thoth will, if you like, allow you to click on any changed value and get a pop-up showing the value in all units it knows about (very much a work in progress at the moment).
- Thoth is extremely tolerant of input formatting: it will recognize "1250kg", "1,250 kg", "1250 kilograms", but also things like "3 metric tons".
- Thoth has advanced ranging, where "1oz" would be transformed to grams, and "100oz" to kilograms (the functionality for that is fine, but I need help fine-tuning limits).

NOTE: for right now, Thoth only does weights!

## Cool, how do I get it?

Thoth has not been submitted to Google yet. It is still pretty limited (mainly in unit categories: it only does weights for now, while I
flesh things out). So yes, sorry, for now, you have to do developy things to get it to run.

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

Yes. Just run the thing and provide feedback on the github page (pages that hang, missing conversions, et cetera).

Or, if you prefer, fix it yourself and add a PR. Especially the test page needs more cases.