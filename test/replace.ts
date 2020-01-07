import test from 'ava';

import * as globReplacer from '../src';

test('should replace filename extension', t => {
    t.is(globReplacer.replace('*.md', '*.html', 'foo.md'), 'foo.html');
});

test('should replace filename extension - globstar to globstar', t => {
    t.is(globReplacer.replace('**/*.md', '**/*.html', 'bar.md'), 'bar.html');
});

test('should replace filename extension - globstar to glob', t => {
    t.is(globReplacer.replace('**/*.md', '*.html', 'baz.md'), 'baz.html');
});

test('should replace filename extension - braces to str', t => {
    t.is(globReplacer.replace('*.{jade,pug}', '*.html', 'qux.pug'), 'qux.html');
});

test('should replace filename extension - braces to braces', t => {
    t.is(
        globReplacer.replace('*.{jade,pug}', '*.{htm,html}', 'quux.jade'),
        'quux.htm',
    );
    t.is(
        globReplacer.replace('*.{jade,pug}', '*.{htm,html}', 'quux.pug'),
        'quux.html',
    );
});

test('should remove filename extension', t => {
    t.is(globReplacer.replace('*.gz', '*', 'corge.tar.gz'), 'corge.tar');
    t.is(globReplacer.replace('*.gz', '**/*', 'corge.tar.gz'), 'corge.tar.png');
});

test('should not replace', t => {
    t.is(globReplacer.replace('*.jpg', '*.*', 'corge.jpg'), 'corge.jpg');
    t.is(globReplacer.replace('*.gif', '**', 'corge.gif'), 'corge.gif');
    t.is(globReplacer.replace('*.{jpg,jpeg}', '*.*', 'corge.jpg'), 'corge.jpg');
});

test('should replace basename without extension', t => {
    t.is(globReplacer.replace('foo.*', 'bar.*', 'foo.gz'), 'bar.gz');
    t.is(globReplacer.replace('foo.*', 'bar.*', 'foo.tar.gz'), 'bar.tar.gz');
});
