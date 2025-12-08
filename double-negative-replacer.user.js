// ==UserScript==
// @name         Double Negative Replacer
// @namespace    https://github.com/bryanvillarin/double-negative-replacer
// @version      1.0.1
// @description  Replaces double negatives with simpler alternatives on any webpage
// @author       https://bryanvillarin.link
// @match        *://*/*
// @match        file:///*
// @exclude      https://github.com/*
// @exclude      https://raw.githubusercontent.com/*
// @updateURL    https://raw.githubusercontent.com/bryanvillarin/double-negative-replacer/main/double-negative-replacer.user.js
// @downloadURL  https://raw.githubusercontent.com/bryanvillarin/double-negative-replacer/main/double-negative-replacer.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // DNR = Double Negative Replacer

    // Double negative mappings
    const replacements = {
        'not uncommon': 'common',
        'not insignificant': 'significant',
        'not unimportant': 'important',
        'not infrequent': 'frequent',
        'not unlikely': 'likely',
        'not unreasonable': 'reasonable',
        'not impossible': 'possible',
        'not unusual': 'usual',
        'not unnecessary': 'necessary',
        'not inconsiderable': 'considerable',
        'unclear': 'clear',
        "don't disagree": 'agree',
        "don't not": 'do',
        'not wrong': 'right',
        'not unsalvagable': 'salvageable',
        "won't not": 'will',
        'not infrequently': 'frequently',
        "wouldn't disagree": 'agree',
        'did not go unnoticed': 'people noticed'
    };

    let replacementCount = 0;
    let skippedCount = 0;

    // Check if element should be excluded (code blocks)
    function isExcluded(element) {
        // Check if element itself is a code block
        const tagName = element.tagName.toLowerCase();
        if (tagName === 'pre' || tagName === 'code' || tagName === 'script' || tagName === 'style') {
            return true;
        }

        // Check if element has code-related classes
        const className = element.className || '';
        const codeClasses = ['code', 'syntax', 'highlight', 'codehilite', 'sourceCode', 'hljs'];
        if (typeof className === 'string' && codeClasses.some(c => className.includes(c))) {
            return true;
        }
        
        // Exclude specific WordPress.com intralink classes
        if (typeof className === 'string') {
            if (className.includes('intralink-content') || className.includes('intralink-content-preview')) {
                return true;
            }
        }

        // Check if inside a code block parent or excluded class parent
        let parent = element.parentElement;
        while (parent) {
            const parentTag = parent.tagName.toLowerCase();
            if (parentTag === 'pre' || parentTag === 'code') {
                return true;
            }
            const parentClass = parent.className || '';
            if (typeof parentClass === 'string') {
                if (codeClasses.some(c => parentClass.includes(c))) {
                    return true;
                }
                // Check for intralink classes in parents
                if (parentClass.includes('intralink-content') || parentClass.includes('intralink-content-preview')) {
                    return true;
                }
            }
            parent = parent.parentElement;
        }

        return false;
    }

    // Count double negatives in excluded content
    function countSkippedInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent;
            
            // Build array of all matches
            const allMatches = [];
            for (const [doubled, simple] of Object.entries(replacements)) {
                const regex = new RegExp(doubled, 'gi');
                let match;
                while ((match = regex.exec(text)) !== null) {
                    allMatches.push({
                        start: match.index,
                        end: match.index + match[0].length,
                        original: match[0]
                    });
                }
            }
            
            if (allMatches.length === 0) return;
            
            // Sort matches by position
            allMatches.sort((a, b) => a.start - b.start);
            
            // Build new content with underlined text
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            
            allMatches.forEach(match => {
                // Add text before this match
                if (match.start > lastIndex) {
                    fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.start)));
                }
                
                // Create underlined span
                const span = document.createElement('span');
                span.textContent = match.original;
                span.style.cssText = 'text-decoration-line: underline; text-decoration-color: #FAA754; text-decoration-style: wavy;';
                fragment.appendChild(span);
                
                lastIndex = match.end;
                skippedCount++;
            });
            
            // Add any remaining text
            if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
            }
            
            // Replace the text node with our fragment
            node.parentNode.replaceChild(fragment, node);
            
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively count in all child nodes
            const children = Array.from(node.childNodes);
            children.forEach(child => countSkippedInNode(child));
        }
    }

    // Replace double negatives in text nodes
    function replaceInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Skip if parent is excluded
            if (isExcluded(node.parentElement)) {
                return;
            }

            let text = node.textContent;
            
            // Build array of all matches with their positions
            const allMatches = [];
            
            for (const [doubled, simple] of Object.entries(replacements)) {
                const regex = new RegExp(doubled, 'gi');
                let match;
                
                while ((match = regex.exec(text)) !== null) {
                    allMatches.push({
                        start: match.index,
                        end: match.index + match[0].length,
                        original: match[0],
                        replacement: simple
                    });
                }
            }
            
            // If no matches, skip this node
            if (allMatches.length === 0) return;
            
            // Sort matches by position
            allMatches.sort((a, b) => a.start - b.start);
            
            // Build new content with highlights
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            
            allMatches.forEach(match => {
                // Add text before this match
                if (match.start > lastIndex) {
                    fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.start)));
                }
                
                // Create highlighted span with tooltip
                const span = document.createElement('span');
                span.textContent = match.replacement;
                span.title = `Original text: '${match.original}'`;
                span.style.cssText = 'background-color: #F5F1E1; font-weight: bold; padding: 2px 4px; border-radius: 3px; cursor: help;';
                fragment.appendChild(span);
                
                lastIndex = match.end;
                replacementCount++;
                
                // Debug logging
                console.log('[DNR] Replacement #' + replacementCount + ':', match.original, '→', match.replacement);
                console.log('[DNR] Parent element:', node.parentElement);
                console.log('[DNR] Full text context:', text.substring(Math.max(0, match.start - 20), Math.min(text.length, match.end + 20)));
                console.log('---');
            });
            
            // Add any remaining text after last match
            if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
            }
            
            // Replace the text node with our fragment
            node.parentNode.replaceChild(fragment, node);

        } else if (node.nodeType === Node.ELEMENT_NODE && !isExcluded(node)) {
            // Recursively process child nodes (convert to array to avoid live collection issues)
            const children = Array.from(node.childNodes);
            children.forEach(child => replaceInNode(child));
        } else if (node.nodeType === Node.ELEMENT_NODE && isExcluded(node)) {
            // This element is excluded - count what we're skipping
            countSkippedInNode(node);
        }
    }

    // Show notification with count
    function showNotification(replaced, skipped) {
        // Only show if replacements were made or items were skipped
        if (replaced === 0 && skipped === 0) return;

        // Create notification container
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 999999;
            background: #E6F2E8;
            color: #2C3E2F;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 16px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Create content
        const title = document.createElement('div');
        title.style.cssText = `
            font-weight: bold;
            margin-bottom: 12px;
        `;
        title.textContent = 'Double Negatives:';
        notification.appendChild(title);

        // Replaced line
        const replacedLine = document.createElement('div');
        replacedLine.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        `;
        
        const replacedText = document.createElement('span');
        replacedText.textContent = '• Replaced:';
        replacedLine.appendChild(replacedText);
        
        const replacedBadge = document.createElement('span');
        replacedBadge.textContent = replaced;
        replacedBadge.style.cssText = `
            background: #F5F1E1;
            color: #320;
            border-radius: 10px;
            padding: 2px 8px;
            font-size: 14px;
            font-weight: bold;
            min-width: 24px;
            text-align: center;
        `;
        replacedLine.appendChild(replacedBadge);
        notification.appendChild(replacedLine);

        // Skipped line
        const skippedLine = document.createElement('div');
        skippedLine.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        
        const skippedText = document.createElement('span');
        skippedText.textContent = '• Skipped (due to exclusions):';
        skippedLine.appendChild(skippedText);
        
        const skippedBadge = document.createElement('span');
        skippedBadge.textContent = skipped;
        skippedBadge.style.cssText = `
            background: #F7DCC6;
            color: #361F00;
            border-radius: 10px;
            padding: 2px 8px;
            font-size: 14px;
            font-weight: bold;
            min-width: 24px;
            text-align: center;
        `;
        skippedLine.appendChild(skippedBadge);
        notification.appendChild(skippedLine);

        // Add to page
        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // Fade out and remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Main replacement function
    function replaceDoubleNegatives() {
        replacementCount = 0;
        skippedCount = 0;

        // Process the entire body
        if (document.body) {
            replaceInNode(document.body);
        }

        // Show notification
        showNotification(replacementCount, skippedCount);
    }

    // Auto-run after 1 second
    setTimeout(() => {
        replaceDoubleNegatives();
    }, 1000);

    // Keyboard shortcut (Ctrl+Shift+D) for manual re-trigger
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            replaceDoubleNegatives();
        }
    });

})();
