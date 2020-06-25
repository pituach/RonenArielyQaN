# Issue: When Editing the message the content show HTML code instead of the Markdown code

Description: many times when I try to edit the message the editor shows the HTML code of the message instead of the Markdown code. This basically prevent from the simple user to edit the message since he cannot see the message in a readable way.

It seems like the data which is stored in the database is the encoded content (to HTML code), and the decode of the data to Markdown code fails.

This script fix the issue

https://youtu.be/JQiS0Hw6K9Y

# Credit

This script simply use the "An HTML to Markdown converter written in JavaScript" script, writen by **Dom Christie**

* turndown Project page: [https://github.com/domchristie/turndown](https://github.com/domchristie/turndown)
* Dom page: [https://github.com/domchristie](https://github.com/domchristie)
