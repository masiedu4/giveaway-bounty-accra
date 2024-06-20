const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

function reverseAndChangeCase(inputString) {
  if (typeof inputString !== "string") {
    console.log("Please provide a valid string.");
    return Error;
  }

  // Function to change case of a character
  function changeCase(char) {
    return char === char.toUpperCase()
      ? char.toLowerCase()
      : char.toUpperCase();
  }

  // Reverse the string and change the case of each character
  const reversedString = inputString
    .split("")
    .reverse()
    .map(changeCase)
    .join("");

  console.log(`Original String: ${inputString}`);
  console.log(`Transformed String: ${reversedString}`);

  return reversedString;
}

async function handle_advance(data) {
  console.log("Received advance request data " + JSON.stringify(data));

  try {
    const output = reverseAndChangeCase(data.payload);

    await fetch(rollup_server + `/report`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ payload: output }),
    });
  } catch (error) {}

  return "accept";
}

async function handle_inspect(data) {
  console.log("Received inspect request data " + JSON.stringify(data));
  return "accept";
}

var handlers = {
  advance_state: handle_advance,
  inspect_state: handle_inspect,
};

var finish = { status: "accept" };

(async () => {
  while (true) {
    const finish_req = await fetch(rollup_server + "/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "accept" }),
    });

    console.log("Received finish status " + finish_req.status);

    if (finish_req.status == 202) {
      console.log("No pending rollup request, trying again");
    } else {
      const rollup_req = await finish_req.json();
      var handler = handlers[rollup_req["request_type"]];
      finish["status"] = await handler(rollup_req["data"]);
    }
  }
})();
