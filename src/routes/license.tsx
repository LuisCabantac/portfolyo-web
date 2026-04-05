import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/license")({
	head: () => ({
		meta: [
			{
				title: "Portfolyo - License",
			},
			{
				name: "description",
				content:
					"Portfolyo is licensed under the MIT License. Read the full text of the license here.",
			},
		],
	}),
	component: License,
});

function License() {
	return (
		<main className="page-wrap px-4 py-12">
			<section className="island-shell mb-8 rounded-2xl md:px-6 py-6 sm:p-8">
				<p className="island-kicker mb-2">Effective: April 5, 2026</p>
				<h1 className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl">
					MIT License
				</h1>
				<p className="m-0 text-base leading-8 text-muted-foreground">
					Copyright (c) 2026 Luis Cabantac
				</p>
			</section>

			<section className="island-shell rounded-2xl md:px-6 py-6 sm:p-8">
				<div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
					<p>
						Permission is hereby granted, free of charge, to any person
						obtaining a copy of this software and associated documentation files
						(the "Software"), to deal in the Software without restriction,
						including without limitation the rights to use, copy, modify, merge,
						publish, distribute, sublicense, and/or sell copies of the Software,
						and to permit persons to whom the Software is furnished to do so,
						subject to the following conditions:
					</p>
					<p>
						The above copyright notice and this permission notice shall be
						included in all copies or substantial portions of the Software.
					</p>
					<p className="font-bold uppercase">
						THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
						EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
						MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
						NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
						BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
						ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
						CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
						SOFTWARE.
					</p>
				</div>
			</section>
		</main>
	);
}
