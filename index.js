$(document).ready(() => {
  const $body = $("body");
  $body.html(""); // Clear the body to ensure it’s empty before adding tweets

  let currentView = "home"; // Default view is the home timeline

  // Apply some basic CSS styling
  $body.css({
    "font-family": "Arial, sans-serif",
    "line-height": "1.5",
    "background-color": "#f4f4f4",
    padding: "20px",
  });

  const $tweetInput = $("<input>")
    .attr("placeholder", "What's happening?")
    .css({
      width: "80%",
      padding: "10px",
      "margin-bottom": "10px",
      "border-radius": "4px",
      border: "1px solid #ccc",
    });
  const $tweetButton = $("<button>").text("Tweet").css({
    padding: "10px 20px",
    "background-color": "#1DA1F2",
    color: "#fff",
    border: "none",
    "border-radius": "4px",
    cursor: "pointer",
  });

  // Function to display tweets in reverse chronological order
  const displayTweets = () => {
    if (currentView !== "home") return; // Set the current view to the home timeline

    $body.html(""); // Clear the body again to refresh the tweets

    $body.append($tweetInput, $tweetButton); // Add the tweet input and button at the top

    const $tweets = streams.home
      .slice()
      .reverse()
      .map((tweet) => {
        // Reverse the order of tweets
        const $tweet = $("<div></div>").css({
          "background-color": "#fff",
          padding: "10px",
          "margin-bottom": "10px",
          "border-radius": "4px",
          "box-shadow": "0 2px 4px rgba(0, 0, 0, 0.1)",
        });

        const $user = $("<span></span>")
          .text(`@${tweet.user}`)
          .css("font-weight", "bold");

        const $message = $("<span></span>")
          .text(`: ${tweet.message}`)
          .css("margin-left", "5px");

        const $timestampExact = $("<span></span>")
          .text(moment(tweet.created_at).format("MMMM Do YYYY, h:mm:ss a"))
          .css({ "font-style": "italic", "font-size": "0.9em", color: "#555" });

        const $timestampHumanFriendly = $("<span></span>")
          .text(` (${moment(tweet.created_at).fromNow()})`)
          .css({
            "font-style": "italic",
            "font-size": "0.9em",
            color: "#999",
            "margin-left": "5px",
          });

        $tweet.append($user); // Add the username
        $tweet.append($message); // Add the message text
        $tweet.append($timestampExact); // Add exact timestamp
        $tweet.append($timestampHumanFriendly); // Add human-friendly timestamp

        // Add click event to the username to display user’s timeline
        $user.on("click", () => {
          displayUserTimeline(tweet.user);
        });

        return $tweet; // Return the constructed tweet div
      });

    $body.append($tweets); // Append all tweets to the body
  };

  // Function to display a specific user's timeline
  const displayUserTimeline = (user) => {
    currentView = user; // Set the current view to the selected user's timeline
    $body.html(""); // Clear the body to display only the selected user's tweets
    const userTweets = streams.users[user]
      .slice()
      .reverse()
      .map((tweet) => {
        const $tweet = $("<div></div>").css({
          "background-color": "#fff",
          padding: "10px",
          "margin-bottom": "10px",
          "border-radius": "4px",
          "box-shadow": "0 2px 4px rgba(0, 0, 0, 0.1)",
        });

        const $message = $("<span></span>").text(
          `@${tweet.user}: ${tweet.message}`
        );
        const $timestampExact = $("<span></span>")
          .text(moment(tweet.created_at).format("MMMM Do YYYY, h:mm:ss a"))
          .css({ "font-style": "italic", "font-size": "0.9em", color: "#555" });

        const $timestampHumanFriendly = $("<span></span>")
          .text(` (${moment(tweet.created_at).fromNow()})`)
          .css({
            "font-style": "italic",
            "font-size": "0.9em",
            color: "#999",
            "margin-left": "5px",
          });

        $tweet.append($message);
        $tweet.append($timestampExact);
        $tweet.append($timestampHumanFriendly);

        return $tweet; // Return the constructed tweet div
      });

    $body.append(userTweets); // Append user's tweets to the body
    $body.append(
      $("<button>Back to Home</button>")
        .on("click", () => {
          currentView = "home"; // Set the current view back to the home timeline
          displayTweets(); // Refresh the tweet list to display the home timeline
        })
        .css({
          padding: "10px 20px",
          "background-color": "#1DA1F2",
          color: "#fff",
          border: "none",
          "border-radius": "4px",
          cursor: "pointer",
          "margin-top": "20px",
        })
    ); // Add a "Back to Home" button
  };

  // Automatically display new tweets every 2 seconds
  setInterval(displayTweets, 2000000); // Refresh tweets every 2 seconds

  // Display tweets on initial load
  displayTweets();

  // Allow users to tweet
  $tweetButton.on("click", () => {
    const message = $tweetInput.val();
    if (message.trim()) {
      window.visitor = "current_user"; // Replace 'current_user' with the actual visitor's username
      writeTweet(message);
      $tweetInput.val(""); // Clear the input field after tweeting
      displayTweets(); // Refresh the tweet list to include the new tweet
    }
  });

  $body.append($tweetInput);
  $body.append($tweetButton);
});
