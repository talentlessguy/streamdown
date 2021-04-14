import test from "ava";
import { MarkdownParser } from "../../source/markdown/MarkdownParser.js";
import { concatAsStream } from "../../source/concatAsStream.js";
import { finished } from "stream/promises";



test(`MarkdownParser is a function`, t => {
    t.is(typeof MarkdownParser, `function`);
});

test(`paragraph`, async t => {
    const markdownParser = new MarkdownParser();
    const t1 = `blablabla`
    const t2 = `zzzzzzzzzzz`
    concatAsStream([`${t1}

${t2}`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, (`<p>${t1}</p><p>${t2}</p>`));
});

test(`quote`, async t => {
    const markdownParser = new MarkdownParser();
    const quote = `An eye for an eye leaves the whole world blind`
    const author = `Gandhi`
    concatAsStream([`> ${quote}

${author}`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, (`<blockquote><p>${quote}</p></blockquote><p>${author}</p>`));
});

// test(`inline quote`, async t => {
//     // is this even possible in markdown ?
//     <q></q>
// });

test(`streaming cut in half`, async t => {
    const markdownParser = new MarkdownParser();
    const t1 = `blablabla`
    const t2 = `zzzzzzzzzzz`
    concatAsStream([`${t1.substr(0, 4)}`, `${t1.substr(4)}

${t2}`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, (`<p>${t1}</p><p>${t2}</p>`));
});

test(`title`, async t => {
    const markdownParser = new MarkdownParser();
    const titleText = `title`
    concatAsStream([`# ${titleText}`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, `<h1>${titleText}</h1>`);
});

test(`link`, async t => {
    const markdownParser = new MarkdownParser();
    const linkTarget = `example.com`
    const linkText = `example`
    concatAsStream([`[${linkText}](${linkTarget})`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    // t.is(forceBuffer, (`<a href="${linkTarget}">${linkText}</a>`));
    t.is(forceBuffer.includes(`<a href="${linkTarget}">${linkText}</a>`), true);
});

test(`image`, async t => {
    const markdownParser = new MarkdownParser();
    const altText = `drinking face`
    const source = `../images/about.jpg`
    concatAsStream([`![${altText}](${source})`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    // t.is(forceBuffer, (`<a href="${linkTarget}">${linkText}</a>`));
    t.is(forceBuffer, (`<p><img alt="${altText}" src="${source}"></p>`));
});

test(`strong`, async t => {
    const markdownParser = new MarkdownParser();
    const x = `important !`
    concatAsStream([`**${x}**`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, (`<strong>${x}</strong>`));
    // t.is(forceBuffer, (`<p><strong>${x}</strong></p>`));
});

test(`deleted`, async t => {
    const markdownParser = new MarkdownParser();
    const x = `removed !`
    concatAsStream([`~~${x}~~`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, (`<del>${x}</del>`));
    // t.is(forceBuffer, (`<p><del>${x}</del></p>`));
});

test(`emphasis`, async t => {
    const markdownParser = new MarkdownParser();
    const x = `notice me`
    concatAsStream([`*${x}*`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, (`<em>${x}</em>`));
    // t.is(forceBuffer, (`<p><em>${x}</em></p>`));
});


test(`unordered list`, async t => {
    const markdownParser = new MarkdownParser();
    const listItem = `xxx yyy`
    const otherListItem = `eee uuu`
    concatAsStream([` * ${listItem}
 * ${otherListItem}`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, (`<ul><li>${listItem}</li><li>${otherListItem}</li></ul>`));
});

test(`ordered list`, async t => {
    const markdownParser = new MarkdownParser();
    const listItem = `aaa bbb`
    const otherListItem = `ccc ddd`
    concatAsStream([` 1. ${listItem}
 2. ${otherListItem}`]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, (`<ol><li>${listItem}</li><li>${otherListItem}</li></ol>`));
});


test(`code block`, async t => {
    const markdownParser = new MarkdownParser();
    const code = `x = 2`
    const lang = `js`
    concatAsStream([`\`\`\`${lang}
${code}\`\`\``]).pipe(markdownParser);

    let forceBuffer = ``
    markdownParser.on('data', (x) => {
        forceBuffer = `${forceBuffer}${x}`;
    });
    await finished(markdownParser);
    t.is(forceBuffer, (`<pre><code class="language-${lang}">${code}</code></pre>`));
});


