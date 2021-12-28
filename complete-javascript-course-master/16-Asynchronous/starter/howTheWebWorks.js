// LECTURE: How the Web Works: Requests and Responses

// What happens when we access a web server?

// The browser sends a request to the server.

// The server send a response back to the browser, containing the data that we requested.

// This process has a name: Request-response model, or the Client-server architecture.

// https://restcountries.eu/rest/v2/alpha/PT
// URL breakdown:

// protocol is HTTP or HTTPS
// domain name is restcountries.eu
// stuff after eu/ is the resource.

// STEP 1.) The first step that happens when we access any web server, is that the browser makes a request to the DNS, and matches the address of the url to the server's IP address, and happens thru your ISP. The domain is NOT the real address, and the DNS will convert the domain to the real IP address.

// Once the IP address has been sent back to the browser, the IP address and port we use to access it, but our url does not physically change.

// STEP 2.) TCP/IP socket connection
// once we have the real IP address, a TCP connection between the browser and server is created. typically kept alive for the entire time it takes to transfer all files of the website or all of the data requested.

// what are tcp and ip?
// TCP = transmission control protocol
// IP = internet protocol

// STEP 3.) HTTP REQUEST
// HTTP = hypertext transfer protocol

// a request message will look something like this

/*
GET /rest/v2/alpha/PT HTTP/1.1 
// Start line: HTTP method (GET.ect) + request target + HTTP version

Host: www.google.com
User-Agent: Mozilla/5.0
Accept-Language: en-US
// HTTP request headers (MANY different possibilities)

<BODY>
// Request body (only when sending data to a server, e.g. POST)
// in the case we are sending data to the server, there will be a body. This will contain the data we are sending.
*/

// HTTP vs HTTPS difference. HTTPS is encrypted using TLS or SSL protocols.

// STEP 4.) HTTP RESPONSE

// once the server is ready to send data back, they send it back as a HTTP response.

// response example:

/*
HTTP/1.1 200 OK
// Start line: HTTP version + status code + status message

Date: Fri, 18 Jan 2021
Content-Type: text/html
Transfer-Encoding: chunked
// HTTP response headers (MANY different possibilities)

<BODY>
// Response body (most responses)
*/

// STEP 5.)

// index.html is the first to be loaded
// Scanned for assets: JS, CSS, images.ect
// Process is repeated for EACH file

// and then finally, the web page can be rendered

// TCP and IP are the communication protocols on how data travels across the web

// Need to know
// 1.) the job of TCP is to break the requests and responses down into thousands of small chunks, called packets, before they are sent. once they arrive at their final destination, TCP will reassemble packets into the original request or response.

// This is necessary so that each packet can take a different route thru the internet. This way, the message arrives as the destination as fast as possible.

// 2.) the job of the IP protocol is to send and route these packets thru the internet. It ensures they arrive at the destination they should go, using IP addresses on each packet.
