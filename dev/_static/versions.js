// 
// The code below was originally written by the authors of Wflow.jl. Their 
// license is provided below. Chat GPT was used to iterately modify the code.
// 

// MIT License for Wflow.jl
//
// Copyright (c) 2020 Deltares and contributors
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

window.onload = function () {
    const versionsUrl = 'https://raw.githubusercontent.com/cadojo/DocumenterQuarto.jl/gh-pages/versions.js';

    // Fetch the versions.js file
    fetch(versionsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${versionsUrl}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(scriptContent => {
            // Use a regular expression to find the DOC_VERSIONS array
            const regex = /var DOC_VERSIONS = (\[.*?\]);/s;
            const match = scriptContent.match(regex);

            if (match && match[1]) {
                // Remove trailing commas if they exist and fix the array syntax for JSON
                let arrayString = match[1].trim();

                // Remove any trailing comma before closing bracket
                arrayString = arrayString.replace(/,\s*([\]}])/g, '$1');

                // Parse the cleaned array string
                try {
                    const DOC_VERSIONS = JSON.parse(arrayString);

                    console.log('DOC_VERSIONS loaded:', DOC_VERSIONS);

                    // Process DOC_VERSIONS as usual
                    const dropdown = document.querySelector('#nav-menu-version')?.nextElementSibling;
                    if (!dropdown) {
                        console.error('Dropdown element not found!');
                        return;
                    }

                    dropdown.innerHTML = ''; // Clear existing items
                    DOC_VERSIONS.forEach(version => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.className = 'dropdown-item';
                        a.href = `/${version}/index.html`;

                        // Wrap version text in a <code> element
                        const code = document.createElement('code');
                        code.textContent = version;

                        // Add <code> to <a>
                        a.appendChild(code);

                        li.appendChild(a); // Add <a> to <li>
                        dropdown.appendChild(li); // Add <li> to the dropdown
                    });

                    console.log('Dropdown populated:', dropdown);

                } catch (error) {
                    console.error('Error parsing DOC_VERSIONS:', error);
                }
            } else {
                console.error('DOC_VERSIONS not found in script.');
            }
        })
        .catch(error => {
            console.error('Error fetching versions.js:', error);
        });
};
