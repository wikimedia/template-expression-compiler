module.exports = (function() {
  "use strict";
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;

    this.name     = "SyntaxError";
  }

  peg$subclass(peg$SyntaxError, Error);

  var exports = {
    SyntaxError:   peg$SyntaxError,
  };


  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser = this,
        peg$currPos = 0,
        peg$savedPos = 0,
        peg$FAILED = {};



    // common-helpers.js
    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    var peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [];

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        /*
         * This works because the bytecode generator guarantees that every
         * expectation object exists only once, so it's enough to use |===| instead
         * of deeper structural comparison.
         */
        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          /*
           * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a string
           * literal except for the closing quote character, backslash, carriage
           * return, line separator, paragraph separator, and line feed. Any character
           * may appear in the form of an escape sequence.
           *
           * For portability, we also escape all control and non-ASCII characters.
           * Note that "\0" and "\v" escape sequences are not used because JSHint does
           * not like the first and IE the second.
           */
          return s
            .replace(/\\/g,   '\\\\')       // backslash
            .replace(/"/g,    '\\"')        // closing double quote
            .replace(/\x08/g, '\\b')        // backspace
            .replace(/\t/g,   '\\t')        // horizontal tab
            .replace(/\n/g,   '\\n')        // line feed
            .replace(/\f/g,   '\\f')        // form feed
            .replace(/\r/g,   '\\r')        // carriage return
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }


  // consts
  var peg$c0 = {"type":"literal","value":"{","description":"\"{\""};
  var peg$c1 = {"type":"literal","value":"}","description":"\"}\""};
  function peg$c2(kvs) {
   return kvs; 
  }
  var peg$c3 = {"type":"class","value":"[ \\t\\n]","description":"[ \\t\\n]"};
  var peg$c4 = {"type":"literal","value":",","description":"\",\""};
  function peg$c5(kv, kvs, kvv) {
   return kvv; 
  }
  function peg$c6(kv, kvs) {

          var res = {};
          [kv].concat(kvs).forEach(function(tuple) {
              res[tuple[0]] = tuple[1];
          });
          return res;
      
  }
  var peg$c7 = {"type":"literal","value":".","description":"\".\""};
  function peg$c8(v, vs, vp) {
   return vp; 
  }
  function peg$c9(v, vs) {

          var vars = [v].concat(vs),
              res = vars[0];
          // Rewrite the first path component
          if (res[0] === '$') {
              if (res === '$') {
                  // user-defined global context access
                  res = 'rc.g';
              } else if (options.ctxMap[res]) {
                  // Built-in context var access
                  res = options.ctxMap[res];
              } else {
                  // local model access
                  res = 'm.' + res;
              }
          } else {
              // local model access
              res = 'm.' + res;
          }

          // remaining path members
          for (var i = 1, l = vars.length; i < l; i++) {
              var v = vars[i];
              if (/^\$/.test(v)
                      && (vars[i-1] === '$parentContext'
                          || vars[i-1] === '$context')
                  )
              {
                  // only rewrite if previous path element can be a context
                  res += '.' + (options.ctxMap[v] || v);
              } else {
                  res += '.' + v;
              }
          }

          return res.replace(/\.([^.]*(?:-[^.]*)+)/g, function(all, paren) {
              return "['" + paren.replace(/'/g, "\\'") + "']";
          });
      
  }
  var peg$c10 = {"type":"class","value":"[\"]","description":"[\"]"};
  var peg$c11 = {"type":"class","value":"[^\"\\\\]","description":"[^\"\\\\]"};
  var peg$c12 = {"type":"literal","value":"\\\"","description":"\"\\\\\\\"\""};
  function peg$c13(s) {
   return "'" + s.replace(/\\"/g, '"').replace(/'/g, "\\'") + "'"; 
  }
  var peg$c14 = {"type":"class","value":"[']","description":"[']"};
  var peg$c15 = {"type":"class","value":"[^'\\\\]","description":"[^'\\\\]"};
  var peg$c16 = {"type":"literal","value":"\\'","description":"\"\\\\'\""};
  function peg$c17(s) {
   return "'" + s + "'" 
  }
  var peg$c18 = {"type":"class","value":"[0-9]","description":"[0-9]"};
  function peg$c19() {
   return Number(text()); 
  }
  function peg$c20(k, s) {
   return s.slice(1,-1).replace(/\\'/g,"'"); 
  }
  var peg$c21 = {"type":"literal","value":":","description":"\":\""};
  function peg$c22(k, v) {
   return [k,v]; 
  }
  function peg$c23(vn, r, c) {
   return vn + (r || '') + (c || ''); 
  }
  var peg$c24 = {"type":"class","value":"[a-z_$]i","description":"[a-z_$]i"};
  var peg$c25 = {"type":"class","value":"[a-z0-9_$-]i","description":"[a-z0-9_$-]i"};
  var peg$c26 = {"type":"literal","value":"[","description":"\"[\""};
  var peg$c27 = {"type":"literal","value":"]","description":"\"]\""};
  function peg$c28(e) {
   return '[' + options.stringifyObject(e) + ']'; 
  }
  var peg$c29 = {"type":"literal","value":"(","description":"\"(\""};
  var peg$c30 = {"type":"literal","value":")","description":"\")\""};
  function peg$c31(p) {
   return '(' + p + ')'; 
  }
  function peg$c32(p0, ps, pn) {
   return pn; 
  }
  function peg$c33(p0, ps) {

          var params = [p0 || ''].concat(ps);
          params = params.map(function(p) {
              return options.stringifyObject(p);
          });
          return params.join(',');
      
  }

  // generated
  function peg$parsestart(silence) {
    var r1,p2,p3,r4,r5;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      r4 = "{";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c0);}
      r4 = peg$FAILED;
      r4 = null;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r5 = peg$parsekey_values(silence);
    // kvs <- r5
    r4 = r5;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    if (input.charCodeAt(peg$currPos) === 125) {
      r4 = "}";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c1);}
      r4 = peg$FAILED;
      r4 = null;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c2(r5);
    }
    // free r4,p3
    return r1;
  }

  function peg$parseexpression(silence) {
    var r1;
    choice_1: {
    r1 = peg$parsevariable(silence);
    if (r1!== peg$FAILED) {
      break choice_1;
    }
    r1 = peg$parseobject(silence);
    if (r1!== peg$FAILED) {
      break choice_1;
    }
    r1 = peg$parsestring(silence);
    if (r1!== peg$FAILED) {
      break choice_1;
    }
    r1 = peg$parsenumber(silence);
    } // choice_1
    return r1;
  }

  function peg$discardspc(silence) {
    var r1,r2;
    r2 = input.charAt(peg$currPos);
    if (/^[ \t\n]/.test(r2)) {
      peg$currPos++;
    } else {
      r2 = peg$FAILED;
      if (!silence) {peg$fail(peg$c3);}
    }
    while (r2 !== peg$FAILED) {
      r2 = input.charAt(peg$currPos);
      if (/^[ \t\n]/.test(r2)) {
        peg$currPos++;
      } else {
        r2 = peg$FAILED;
        if (!silence) {peg$fail(peg$c3);}
      }
    }
    // free r2
    r1 = true;
    // free r1
    return r1;
  }

  function peg$parsekey_values(silence) {
    var r1,p2,p3,r4,r5,r6,r7,p8,p9,r10,r11,p12,r13;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    r5 = peg$parsekey_value(silence);
    // kv <- r5
    r4 = r5;
    if (r4 === peg$FAILED) {
      r1 = peg$FAILED;
      break seq_1;
    }
    r6 = [];
    p8 = peg$currPos;
    seq_2: {
    p9 = peg$currPos;
    r10 = peg$discardspc(silence);
    if (r10 === peg$FAILED) {
      r7 = peg$FAILED;
      break seq_2;
    }
    if (input.charCodeAt(peg$currPos) === 44) {
      r10 = ",";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c4);}
      r10 = peg$FAILED;
      peg$currPos = p9;
      r7 = peg$FAILED;
      break seq_2;
    }
    r10 = peg$discardspc(silence);
    if (r10 === peg$FAILED) {
      peg$currPos = p9;
      r7 = peg$FAILED;
      break seq_2;
    }
    r11 = peg$parsekey_value(silence);
    // kvv <- r11
    r10 = r11;
    if (r10 === peg$FAILED) {
      peg$currPos = p9;
      r7 = peg$FAILED;
      break seq_2;
    }
    r7 = true;
    } // seq_2
    if (r7!== peg$FAILED) {
      peg$savedPos = p8;
      r7 = peg$c5(r5,r6,r11);
    }
    // free r10,p9
    while (r7 !== peg$FAILED) {
      r6.push(r7);
      p9 = peg$currPos;
      seq_3: {
      p12 = peg$currPos;
      r10 = peg$discardspc(silence);
      if (r10 === peg$FAILED) {
        r7 = peg$FAILED;
        break seq_3;
      }
      if (input.charCodeAt(peg$currPos) === 44) {
        r10 = ",";
        peg$currPos += 1;
      } else {
        if (!silence) {peg$fail(peg$c4);}
        r10 = peg$FAILED;
        peg$currPos = p12;
        r7 = peg$FAILED;
        break seq_3;
      }
      r10 = peg$discardspc(silence);
      if (r10 === peg$FAILED) {
        peg$currPos = p12;
        r7 = peg$FAILED;
        break seq_3;
      }
      r13 = peg$parsekey_value(silence);
      // kvv <- r13
      r10 = r13;
      if (r10 === peg$FAILED) {
        peg$currPos = p12;
        r7 = peg$FAILED;
        break seq_3;
      }
      r7 = true;
      } // seq_3
      if (r7!== peg$FAILED) {
        peg$savedPos = p9;
        r7 = peg$c5(r5,r6,r13);
      }
      // free r10,p12
    }
    // kvs <- r6
    // free r7
    r4 = r6;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c6(r5,r6);
    }
    // free r4,p3
    return r1;
  }

  function peg$parsevariable(silence) {
    var r1,p2,p3,r4,r5,r6,r7,p8,p9,r10,r11,p12,r13;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    r5 = peg$parsevarpart(silence);
    // v <- r5
    r4 = r5;
    if (r4 === peg$FAILED) {
      r1 = peg$FAILED;
      break seq_1;
    }
    r6 = [];
    p8 = peg$currPos;
    seq_2: {
    p9 = peg$currPos;
    r10 = peg$discardspc(silence);
    if (r10 === peg$FAILED) {
      r7 = peg$FAILED;
      break seq_2;
    }
    if (input.charCodeAt(peg$currPos) === 46) {
      r10 = ".";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c7);}
      r10 = peg$FAILED;
      peg$currPos = p9;
      r7 = peg$FAILED;
      break seq_2;
    }
    r11 = peg$parsevarpart(silence);
    // vp <- r11
    r10 = r11;
    if (r10 === peg$FAILED) {
      peg$currPos = p9;
      r7 = peg$FAILED;
      break seq_2;
    }
    r7 = true;
    } // seq_2
    if (r7!== peg$FAILED) {
      peg$savedPos = p8;
      r7 = peg$c8(r5,r6,r11);
    }
    // free r10,p9
    while (r7 !== peg$FAILED) {
      r6.push(r7);
      p9 = peg$currPos;
      seq_3: {
      p12 = peg$currPos;
      r10 = peg$discardspc(silence);
      if (r10 === peg$FAILED) {
        r7 = peg$FAILED;
        break seq_3;
      }
      if (input.charCodeAt(peg$currPos) === 46) {
        r10 = ".";
        peg$currPos += 1;
      } else {
        if (!silence) {peg$fail(peg$c7);}
        r10 = peg$FAILED;
        peg$currPos = p12;
        r7 = peg$FAILED;
        break seq_3;
      }
      r13 = peg$parsevarpart(silence);
      // vp <- r13
      r10 = r13;
      if (r10 === peg$FAILED) {
        peg$currPos = p12;
        r7 = peg$FAILED;
        break seq_3;
      }
      r7 = true;
      } // seq_3
      if (r7!== peg$FAILED) {
        peg$savedPos = p9;
        r7 = peg$c8(r5,r6,r13);
      }
      // free r10,p12
    }
    // vs <- r6
    // free r7
    r4 = r6;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c9(r5,r6);
    }
    // free r4,p3
    return r1;
  }

  function peg$parseobject(silence) {
    var r1,p2,p3,r4,r5;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      r4 = "{";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c0);}
      r4 = peg$FAILED;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r5 = peg$parsekey_values(silence);
    // kvs <- r5
    r4 = r5;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    if (input.charCodeAt(peg$currPos) === 125) {
      r4 = "}";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c1);}
      r4 = peg$FAILED;
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c2(r5);
    }
    // free r4,p3
    return r1;
  }

  function peg$parsestring(silence) {
    var r1,p2,p3,r4,r5,p6,r7,r8,p9,r10;
    choice_1: {
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    r4 = input.charAt(peg$currPos);
    if (/^["]/.test(r4)) {
      peg$currPos++;
    } else {
      r4 = peg$FAILED;
      if (!silence) {peg$fail(peg$c10);}
      r1 = peg$FAILED;
      break seq_1;
    }
    p6 = peg$currPos;
    choice_2: {
    r8 = input.charAt(peg$currPos);
    if (/^[^"\\]/.test(r8)) {
      peg$currPos++;
      r7 = true;
      while (r8 !== peg$FAILED) {
        r8 = input.charAt(peg$currPos);
        if (/^[^"\\]/.test(r8)) {
          peg$currPos++;
        } else {
          r8 = peg$FAILED;
          if (!silence) {peg$fail(peg$c11);}
        }
      }
    } else {
      r8 = peg$FAILED;
      if (!silence) {peg$fail(peg$c11);}
      r7 = peg$FAILED;
    }
    if (r7!== peg$FAILED) {
      break choice_2;
    }
    // free r8
    r7 = input.substr(peg$currPos,2);
    if (r7 === "\\\"") {
      peg$currPos += 2;
    } else {
      if (!silence) {peg$fail(peg$c12);}
      r7 = peg$FAILED;
    }
    } // choice_2
    while (r7 !== peg$FAILED) {
      choice_3: {
      r8 = input.charAt(peg$currPos);
      if (/^[^"\\]/.test(r8)) {
        peg$currPos++;
        r7 = true;
        while (r8 !== peg$FAILED) {
          r8 = input.charAt(peg$currPos);
          if (/^[^"\\]/.test(r8)) {
            peg$currPos++;
          } else {
            r8 = peg$FAILED;
            if (!silence) {peg$fail(peg$c11);}
          }
        }
      } else {
        r8 = peg$FAILED;
        if (!silence) {peg$fail(peg$c11);}
        r7 = peg$FAILED;
      }
      if (r7!== peg$FAILED) {
        break choice_3;
      }
      // free r8
      r7 = input.substr(peg$currPos,2);
      if (r7 === "\\\"") {
        peg$currPos += 2;
      } else {
        if (!silence) {peg$fail(peg$c12);}
        r7 = peg$FAILED;
      }
      } // choice_3
    }
    // free r7
    r5 = true;
    // s <- r5
    if (r5!== peg$FAILED) {
      r5 = input.substring(p6,peg$currPos);
    } else {
      r5 = peg$FAILED;
    }
    // free p6
    r4 = r5;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = input.charAt(peg$currPos);
    if (/^["]/.test(r4)) {
      peg$currPos++;
    } else {
      r4 = peg$FAILED;
      if (!silence) {peg$fail(peg$c10);}
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c13(r5);
      break choice_1;
    }
    // free r4,p3
    p3 = peg$currPos;
    seq_2: {
    p6 = peg$currPos;
    r4 = input.charAt(peg$currPos);
    if (/^[']/.test(r4)) {
      peg$currPos++;
    } else {
      r4 = peg$FAILED;
      if (!silence) {peg$fail(peg$c14);}
      r1 = peg$FAILED;
      break seq_2;
    }
    p9 = peg$currPos;
    choice_4: {
    r10 = input.charAt(peg$currPos);
    if (/^[^'\\]/.test(r10)) {
      peg$currPos++;
      r8 = true;
      while (r10 !== peg$FAILED) {
        r10 = input.charAt(peg$currPos);
        if (/^[^'\\]/.test(r10)) {
          peg$currPos++;
        } else {
          r10 = peg$FAILED;
          if (!silence) {peg$fail(peg$c15);}
        }
      }
    } else {
      r10 = peg$FAILED;
      if (!silence) {peg$fail(peg$c15);}
      r8 = peg$FAILED;
    }
    if (r8!== peg$FAILED) {
      break choice_4;
    }
    // free r10
    r8 = input.substr(peg$currPos,2);
    if (r8 === "\\'") {
      peg$currPos += 2;
    } else {
      if (!silence) {peg$fail(peg$c16);}
      r8 = peg$FAILED;
    }
    } // choice_4
    while (r8 !== peg$FAILED) {
      choice_5: {
      r10 = input.charAt(peg$currPos);
      if (/^[^'\\]/.test(r10)) {
        peg$currPos++;
        r8 = true;
        while (r10 !== peg$FAILED) {
          r10 = input.charAt(peg$currPos);
          if (/^[^'\\]/.test(r10)) {
            peg$currPos++;
          } else {
            r10 = peg$FAILED;
            if (!silence) {peg$fail(peg$c15);}
          }
        }
      } else {
        r10 = peg$FAILED;
        if (!silence) {peg$fail(peg$c15);}
        r8 = peg$FAILED;
      }
      if (r8!== peg$FAILED) {
        break choice_5;
      }
      // free r10
      r8 = input.substr(peg$currPos,2);
      if (r8 === "\\'") {
        peg$currPos += 2;
      } else {
        if (!silence) {peg$fail(peg$c16);}
        r8 = peg$FAILED;
      }
      } // choice_5
    }
    // free r8
    r7 = true;
    // s <- r7
    if (r7!== peg$FAILED) {
      r7 = input.substring(p9,peg$currPos);
    } else {
      r7 = peg$FAILED;
    }
    // free p9
    r4 = r7;
    if (r4 === peg$FAILED) {
      peg$currPos = p6;
      r1 = peg$FAILED;
      break seq_2;
    }
    r4 = input.charAt(peg$currPos);
    if (/^[']/.test(r4)) {
      peg$currPos++;
    } else {
      r4 = peg$FAILED;
      if (!silence) {peg$fail(peg$c14);}
      peg$currPos = p6;
      r1 = peg$FAILED;
      break seq_2;
    }
    r1 = true;
    } // seq_2
    if (r1!== peg$FAILED) {
      peg$savedPos = p3;
      r1 = peg$c17(r7);
    }
    // free r4,p6
    } // choice_1
    return r1;
  }

  function peg$parsenumber(silence) {
    var r1,p2,p3,r4,r5,p6,r7;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    r5 = input.charAt(peg$currPos);
    if (/^[0-9]/.test(r5)) {
      peg$currPos++;
      r4 = true;
      while (r5 !== peg$FAILED) {
        r5 = input.charAt(peg$currPos);
        if (/^[0-9]/.test(r5)) {
          peg$currPos++;
        } else {
          r5 = peg$FAILED;
          if (!silence) {peg$fail(peg$c18);}
        }
      }
    } else {
      r5 = peg$FAILED;
      if (!silence) {peg$fail(peg$c18);}
      r4 = peg$FAILED;
    }
    if (r4 === peg$FAILED) {
      r1 = peg$FAILED;
      break seq_1;
    }
    // free r5
    seq_2: {
    p6 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 46) {
      r5 = ".";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c7);}
      r5 = peg$FAILED;
      r4 = peg$FAILED;
      break seq_2;
    }
    r7 = input.charAt(peg$currPos);
    if (/^[0-9]/.test(r7)) {
      peg$currPos++;
      r5 = true;
      while (r7 !== peg$FAILED) {
        r7 = input.charAt(peg$currPos);
        if (/^[0-9]/.test(r7)) {
          peg$currPos++;
        } else {
          r7 = peg$FAILED;
          if (!silence) {peg$fail(peg$c18);}
        }
      }
    } else {
      r7 = peg$FAILED;
      if (!silence) {peg$fail(peg$c18);}
      r5 = peg$FAILED;
    }
    if (r5 === peg$FAILED) {
      peg$currPos = p6;
      r4 = peg$FAILED;
      break seq_2;
    }
    // free r7
    r4 = true;
    } // seq_2
    if (r4 === peg$FAILED) {
      r4 = null;
    }
    // free r5,p6
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c19();
    }
    // free r4,p3
    return r1;
  }

  function peg$parsekey_value(silence) {
    var r1,p2,p3,r4,r5,p6,r7,r8;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    choice_1: {
    r5 = peg$parsevarname(silence);
    if (r5!== peg$FAILED) {
      break choice_1;
    }
    p6 = peg$currPos;
    r7 = peg$parsestring(silence);
    // s <- r7
    r5 = r7;
    if (r5!== peg$FAILED) {
      peg$savedPos = p6;
      r5 = peg$c20(r5,r7);
    }
    } // choice_1
    // k <- r5
    r4 = r5;
    if (r4 === peg$FAILED) {
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    if (input.charCodeAt(peg$currPos) === 58) {
      r4 = ":";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c21);}
      r4 = peg$FAILED;
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r8 = peg$parseexpression(silence);
    // v <- r8
    r4 = r8;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c22(r5,r8);
    }
    // free r4,p3
    return r1;
  }

  function peg$parsevarpart(silence) {
    var r1,p2,p3,r4,r5,r6,r7;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    r5 = peg$parsevarname(silence);
    // vn <- r5
    r4 = r5;
    if (r4 === peg$FAILED) {
      r1 = peg$FAILED;
      break seq_1;
    }
    r6 = peg$parsearrayref(silence);
    if (r6 === peg$FAILED) {
      r6 = null;
    }
    // r <- r6
    r4 = r6;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r7 = peg$parsecall(silence);
    if (r7 === peg$FAILED) {
      r7 = null;
    }
    // c <- r7
    r4 = r7;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c23(r5,r6,r7);
    }
    // free r4,p3
    return r1;
  }

  function peg$parsevarname(silence) {
    var p1,r2,p3,r4,r5;
    p1 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    r4 = input.charAt(peg$currPos);
    if (/^[a-z_$]/i.test(r4)) {
      peg$currPos++;
    } else {
      r4 = peg$FAILED;
      if (!silence) {peg$fail(peg$c24);}
      r2 = peg$FAILED;
      break seq_1;
    }
    r5 = input.charAt(peg$currPos);
    if (/^[a-z0-9_$\-]/i.test(r5)) {
      peg$currPos++;
    } else {
      r5 = peg$FAILED;
      if (!silence) {peg$fail(peg$c25);}
    }
    while (r5 !== peg$FAILED) {
      r5 = input.charAt(peg$currPos);
      if (/^[a-z0-9_$\-]/i.test(r5)) {
        peg$currPos++;
      } else {
        r5 = peg$FAILED;
        if (!silence) {peg$fail(peg$c25);}
      }
    }
    // free r5
    r4 = true;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r2 = peg$FAILED;
      break seq_1;
    }
    r2 = true;
    } // seq_1
    if (r2!== peg$FAILED) {
      r2 = input.substring(p1,peg$currPos);
    } else {
      r2 = peg$FAILED;
    }
    // free r4,p3
    // free p1
    return r2;
  }

  function peg$parsearrayref(silence) {
    var r1,p2,p3,r4,r5;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 91) {
      r4 = "[";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c26);}
      r4 = peg$FAILED;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r5 = peg$parseexpression(silence);
    // e <- r5
    r4 = r5;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    if (input.charCodeAt(peg$currPos) === 93) {
      r4 = "]";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c27);}
      r4 = peg$FAILED;
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c28(r5);
    }
    // free r4,p3
    return r1;
  }

  function peg$parsecall(silence) {
    var r1,p2,p3,r4,r5;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 40) {
      r4 = "(";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c29);}
      r4 = peg$FAILED;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r5 = peg$parseparameters(silence);
    // p <- r5
    r4 = r5;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r4 = peg$discardspc(silence);
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    if (input.charCodeAt(peg$currPos) === 41) {
      r4 = ")";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c30);}
      r4 = peg$FAILED;
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c31(r5);
    }
    // free r4,p3
    return r1;
  }

  function peg$parseparameters(silence) {
    var r1,p2,p3,r4,r5,r6,r7,p8,p9,r10,r11,p12,r13;
    p2 = peg$currPos;
    seq_1: {
    p3 = peg$currPos;
    r5 = peg$parseexpression(silence);
    if (r5 === peg$FAILED) {
      r5 = null;
    }
    // p0 <- r5
    r4 = r5;
    if (r4 === peg$FAILED) {
      r1 = peg$FAILED;
      break seq_1;
    }
    r6 = [];
    p8 = peg$currPos;
    seq_2: {
    p9 = peg$currPos;
    r10 = peg$discardspc(silence);
    if (r10 === peg$FAILED) {
      r7 = peg$FAILED;
      break seq_2;
    }
    if (input.charCodeAt(peg$currPos) === 44) {
      r10 = ",";
      peg$currPos += 1;
    } else {
      if (!silence) {peg$fail(peg$c4);}
      r10 = peg$FAILED;
      peg$currPos = p9;
      r7 = peg$FAILED;
      break seq_2;
    }
    r10 = peg$discardspc(silence);
    if (r10 === peg$FAILED) {
      peg$currPos = p9;
      r7 = peg$FAILED;
      break seq_2;
    }
    r11 = peg$parseexpression(silence);
    // pn <- r11
    r10 = r11;
    if (r10 === peg$FAILED) {
      peg$currPos = p9;
      r7 = peg$FAILED;
      break seq_2;
    }
    r7 = true;
    } // seq_2
    if (r7!== peg$FAILED) {
      peg$savedPos = p8;
      r7 = peg$c32(r5,r6,r11);
    }
    // free r10,p9
    while (r7 !== peg$FAILED) {
      r6.push(r7);
      p9 = peg$currPos;
      seq_3: {
      p12 = peg$currPos;
      r10 = peg$discardspc(silence);
      if (r10 === peg$FAILED) {
        r7 = peg$FAILED;
        break seq_3;
      }
      if (input.charCodeAt(peg$currPos) === 44) {
        r10 = ",";
        peg$currPos += 1;
      } else {
        if (!silence) {peg$fail(peg$c4);}
        r10 = peg$FAILED;
        peg$currPos = p12;
        r7 = peg$FAILED;
        break seq_3;
      }
      r10 = peg$discardspc(silence);
      if (r10 === peg$FAILED) {
        peg$currPos = p12;
        r7 = peg$FAILED;
        break seq_3;
      }
      r13 = peg$parseexpression(silence);
      // pn <- r13
      r10 = r13;
      if (r10 === peg$FAILED) {
        peg$currPos = p12;
        r7 = peg$FAILED;
        break seq_3;
      }
      r7 = true;
      } // seq_3
      if (r7!== peg$FAILED) {
        peg$savedPos = p9;
        r7 = peg$c32(r5,r6,r13);
      }
      // free r10,p12
    }
    // ps <- r6
    // free r7
    r4 = r6;
    if (r4 === peg$FAILED) {
      peg$currPos = p3;
      r1 = peg$FAILED;
      break seq_1;
    }
    r1 = true;
    } // seq_1
    if (r1!== peg$FAILED) {
      peg$savedPos = p2;
      r1 = peg$c33(r5,r6);
    }
    // free r4,p3
    return r1;
  }

    // start

    var peg$startRuleFunctions = {start: peg$parsestart,expression: peg$parseexpression},
        peg$startRuleFunction = peg$parsestart,
        peg$streamRuleFunctions = {},
        peg$streamRuleFunction;

    if (options.stream) {
      peg$streamRuleFunction = peg$streamundefined;
      if ("startRule" in options) {
        if (!(options.startRule in peg$streamRuleFunctions)) {
          throw new Error("Can't stream rule \"" + options.startRule + "\".");
        }
        peg$streamRuleFunction = peg$streamRuleFunctions[options.startRule];
      }
    } else if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    peg$currPos = 0;

    if (options.stream) {
      return peg$streamRuleFunction(false);
    }

    var peg$result = peg$startRuleFunction(false);

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }
  exports.parse = peg$parse;

  return exports;
})();
