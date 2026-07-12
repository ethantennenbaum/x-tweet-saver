// interceptor.js — runs in the MAIN world (page context).
// Patches fetch + XMLHttpRequest so we can read X's GraphQL responses
// and forward the raw JSON to the content script via window.postMessage.

(function () {
  "use strict";

  const TAG = "__X_TWEET_SAVER__";

  const RELEVANT = [
    "UserTweets",
    "UserTweetsAndReplies",
    "UserMedia",
    "TweetDetail",
    "HomeTimeline",
    "HomeLatestTimeline",
    "UserWithProfileTweetsQueryV2",
    "UserWithProfileTweetsAndRepliesQueryV2"
  ];

  function isRelevant(url) {
    if (!url) return false;
    return RELEVANT.some((op) => url.includes("/" + op) || url.includes(op));
  }

  function forward(url, jsonText) {
    try {
      window.postMessage(
        { source: TAG, kind: "graphql", url: String(url), body: jsonText },
        "*"
      );
    } catch (e) {}
  }

  // --- patch fetch ---
  const origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function (...args) {
      const req = args[0];
      const url = typeof req === "string" ? req : req && req.url;
      const p = origFetch.apply(this, args);
      if (isRelevant(url)) {
        p.then((resp) => {
          try {
            resp
              .clone()
              .text()
              .then((t) => forward(url, t))
              .catch(() => {});
          } catch (e) {}
        }).catch(() => {});
      }
      return p;
    };
  }

  // --- patch XMLHttpRequest ---
  const OrigXHR = window.XMLHttpRequest;
  if (OrigXHR) {
    const origOpen = OrigXHR.prototype.open;
    const origSend = OrigXHR.prototype.send;

    OrigXHR.prototype.open = function (method, url, ...rest) {
      this.__xts_url = url;
      return origOpen.call(this, method, url, ...rest);
    };

    OrigXHR.prototype.send = function (...args) {
      if (isRelevant(this.__xts_url)) {
        this.addEventListener("load", function () {
          try {
            if (this.responseType === "" || this.responseType === "text") {
              forward(this.__xts_url, this.responseText);
            }
          } catch (e) {}
        });
      }
      return origSend.apply(this, args);
    };
  }

  window.postMessage({ source: TAG, kind: "ready" }, "*");
})();
