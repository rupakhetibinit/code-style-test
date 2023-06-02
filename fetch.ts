let headersList = {
	'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
	'Content-Type': 'application/json',
};

let bodyContent = JSON.stringify({
	code: 'function add(a,b){return a+b;}',
	testcode: "it('should add a+b',()=>{expect(add(1,3)).toBe(4)})",
});

let response = fetch('http://localhost:3000/execute', {
	method: 'POST',
	body: bodyContent,
})
	.then((e) => e.json())
	.then((data) => JSON.stringify(JSON.parse(data), null, 2));
