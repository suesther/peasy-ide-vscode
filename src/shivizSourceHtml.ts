import { IShiVizScriptsUri } from "./web/types/shiviz";

const shivizSourceHtml = (
  shivizScriptsUriMap: IShiVizScriptsUri,
  stylesUriMap: IShiVizScriptsUri,
  errorTraceJsonLogsString: string
): string => {
  return `<!DOCTYPE html>
              <html>
              <head>
                  <meta charset="utf-8">
                  <link rel="canonical" href="http://bestchai.bitbucket.io/shiviz/">
                  <link rel="shortcut icon" href="images/favico.ico" type="image/x-icon" />
                  <title>ShiViz</title>
                  <link href="${stylesUriMap["shivizStylesUri"]}" type="text/css" rel="stylesheet">
                  <link href="${stylesUriMap["stylesResetUri"]}" type="text/css" rel="stylesheet">
                  <link href="${stylesUriMap["stylesMainUri"]}" type="text/css" rel="stylesheet">
                  <!-- DEPENDENCIES -->

                  <!--<script src="local_scripts/d3.min.js"></script>-->
                  <script src="${shivizScriptsUriMap["d3.v4.min"]}"></script>
                  <script src="${shivizScriptsUriMap["jquery-3.2.1.min"]}"></script>
                  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
                  <style type="text/css">
                      #vizContainer svg line.hidden-link {
                          stroke-width: 1px;
                          stroke: url(#gedge);
                      }
                  </style>
              </head>
              <body>

                  <div class="load">h</div>
                  <section class="home">
                      <header class="icon">
                          <ul class="tabs">
                              <li class="active">h</li>
                              <li>i</li>
                              <li class="disabled">a</li>
                          </ul>
                          <div id="versionContainer"></div>
                      </header>
                      <div class="content">
                          <h1>ShiViz</h1>
                          <h2>
                              The <strong>ShiViz</strong> vis&shy;ual&shy;izat&shy;ion engi&shy;ne gene&shy;r&shy;ate&shy;s inter&shy;active comm&shy;uni&shy;ca&shy;tion graphs from dis&shy;tri&shy;but&shy;ed sys&shy;tem exe&shy;cut&shy;ion logs.
                          </h2>

                          <button class="try">Try out ShiViz</button>

                          <h3>What am I looking at?</h3>
                          <p>
                              In the visualization:
                              <ul>
                                  <li>
                                      Time flows from top to bottom.
                                  </li>
                                  <li>
                                      The left panel shows the log and the middle panel displays a <a href="http://en.wikipedia.org/wiki/Directed_acyclic_graph">DAG</a> of the partially ordered vector timestamps recorded in the input log.
                                  </li>
                                  <li>
                                      A vertical line with a box at the top is a <strong>process timeline</strong>. This represents a single thread of execution (e.g., a process).
                                  </li>
                                  <li>
                                      Circles on a process timeline are <strong>events</strong> that were executed by the process.
                                  </li>
                                  <li>
                                      Diagonal lines connecting two events represent the
                                      <a href="http://en.wikipedia.org/wiki/Happened-before">happened-before</a> relation between the events: the higher of the two events happened <i>before</i> the second event.
                                  </li>
                                  <li>
                                      Dashed lines represent transitive communication edges. These only appear when a process is hidden, and two processes that are not hidden communicated indirectly through this process.
                                  </li>
                                  <li>
                                      Larger circles represent merged local events. These have a number inside of them, indicating the number of events that they represent.
                                  </li>
                                  <li>
                                      Radiating lines that fade out represent communication edges to processes that are currently hidden from view.
                                  </li>
                                  <li>
                                      Each process is associated with a unique color. Log entries in the left column have the corresponding process color. By default, the log entries are sorted in the order in which the entries appear in the graph.
                                  </li>
                              </ul>
                          </p>

                          <h3>How do I interact with the visualization?</h3>
                          <p>
                              The visualization supports the following actions:
                              <ul>
                                <li>
                                      <strong>Show process name or event info</strong>
                                      <br>
                                      Click on a process box or an event circle.
                                  </li>
                                  <li>
                                      <strong>Hide a process timeline</strong>
                                      <br>
                                      Click a process box and select "hide". This
                                      will remove the process and its timeline from
                                      view. You can hide more than one process.
                                  </li>
                                  <li>
                                      <strong>Filter by communication to process(es)</strong>
                                      <br>
                                      Click a process box and select "filter". The
                                      graph will be filtered to show only those
                                      processes/events that communicate with the
                                      filtered process. You can filter by more than
                                      one process.
                                  </li>
                                <li>
                                      <strong>Expand/collapse non-communicating events</strong>
                                      <br>
                                      ShiViz collapses adjacent process events not
                                      incident on any communication edges into
                                      larger circles. Click on one of these nodes
                                      and select "expand" to undo this collapsing.
                                  </li>
                                <li>
                                  <strong>Search for keywords or subgraphs</strong>
                                      <br>
                                      ShiViz supports keyword search across the
                                      parsed fields. Search supports logical
                                      connectives and regular expressions. You can
                                      also search for subgraphs or communication 
                                      topologies of interest. You can search for a 
                                      pre-defined structure like broadcast
                                      or request-response, or you can define and
                                      search for a custom structure.
                                  </li>
                              <li>
                                  <strong>Show and hide differences between executions</strong>
                                      <br>
                                      When viewing two executions side-by-side,
                                      click on "show differences" to highlight the
                                      differences between two executions. Hosts that
                                      are not common to both executions are
                                      represented as rhombuses. Processes present in
                                      both executions have their events compared by
                                      the <code>event</code> capture group. Different
                                      events are drawn as rhombuses.
                                  </li>

                                  <li>
                                  <strong>Explore execution clusters</strong>
                                      <br>
                                      For logs with multiple executions, click on the
                                      "clusters" tab to separate executions into 
                                      different groups based on a chosen metric.

                                      Cluster by the number of processes to group
                                      executions by the midpoint between the smallest 
                                      and largest number of processes.

                                      Cluster by execution comparison to see an overview
                                      of how executions differ from a selected base.
                                  </li>

                                  <li>
                                  <strong>Search for network motifs</strong>
                                      <br>
                                      Click on the "motifs" tab to find frequently
                                      occurring communication patterns within and
                                      across executions. Search for 2, 3 or 4-event
                                      motifs that occur in at least 50% of the
                                      executions or that appear at least 5 times 
                                      within a single execution.
                                  </li>
                              </ul>
                          </p>

                          <h3 id="helpsectiontitle">How is this tool useful?</h3>
                          <p>
                              Here are four use-cases that ShiViz helps to support:
                              <ul>
                                  <li>
                                      <strong>Understanding the communication graph.</strong>
                                      <br>
                                      Quickly scan the graph to identify the presence or absence of certain communication patterns.
                                  </li>
                                  <li>
                                      <strong>Reasoning about ordering in a concurrent or distributed setting</strong>.
                                      <br>
                                      Visualize concurrency and the happened-before relation to understand if two events occurred concurrently, or if one happened before the other.
                                  </li>
                                  <li>
                                      <strong>Analyzing activity at processes that matter</strong>.
                                      <br>
                                      Hide processes (and their log lines) for a more focused visualization. Filter by communication to a process to see only those events at other processes that were likely to have influenced the execution of a process you care about.
                                  </li>

                                  <li>
                                    <strong>Execution comparison and
                                    differencing</strong>
                                    <br>
                                    Use ShiViz to process logs containing multiple
                                    executions. Compare executions pairwise,
                                    side-by-side. Use ShiViz to highlight event and
                                    host differences between two executions to
                                    understand where the executions diverge.
                                  </li>
                              </ul>
                          </p>

                          <h3>What is the input log format to the tool?</h3>

                          <p>
                              You can specify the log format using a regular expression on the Input page. The regular expression must contain the following three named capture groups:
                              <ul>
                                  <li><strong><code>event</code>:</strong> the description of the event</li>
                                  <li><strong><code>host</code>:</strong> the name of the process, thread, or host that executed the event</li>
                                  <li><strong><code>clock</code>:</strong> the vector clock associated with the event, in JSON format</li>
                              </ul>
                          </p>
                          <p>
                              You can also specify other capture groups other than <code>event</code> to capture <em>fields</em> (such as date, IP, priority) which are shown in the sidebar while hovering over an event in the visualization. These fields, unless sub-groups of the <code>event</code> group, will not be displayed as part of the event message.
                          </p>
                          <p>
                              For example, for a log entry like:
                              <pre>28/07/14 01:15 PM Event executed<br>process2 {"process1" : time1, "process2" : time2, ..., "processN" : timeN}</pre>

                              We might have a parser RegExp like:
                              <pre>(?&lt;date&gt;\d\d/\d\d/\d\d \d\d:\d\d (AM|PM)) (?&lt;event&gt;.*)\n(?&lt;host&gt;\w+) (?&lt;clock&gt;\{.*\})</pre>
                          </p>
                          <p>
                            The capture groups in ShiViz is not standard regexp
                            syntax. We recommend using a plain
                            <a href="https://www.debuggex.com/">JS regexp tester</a>
                            with regular capture groups to develop expressions, and
                            name the capture groups afterwards.
                          </p>

                          <h3>How can I generate logs to use with ShiViz?</h3>
                          <p>
                            We developed several ShiViz-compatible vector-clock
                            instrumentation <a href="https://distributedclocks.github.io/">libraries</a>
                            for C/C++/Java/Go systems.
                          </p>
                          <p>
                            In general, you can study the execution of any system
                            that produces logs in a format that can be parsed using
                            the RegExp mechanism above.
                          </p>

                          <h3>More information</h3>
                            <ul>
                              <li><a href="https://bitbucket.org/bestchai/shiviz/src">ShiViz source code</a></li>
                              <li>Contact: <a href="http://www.cs.ubc.ca/~bestchai/">Ivan Beschastnikh</a>, bestchai@cs.ubc.ca</li>
                              <li><a href="http://homes.cs.washington.edu/~mernst/pubs/debug-distributed-cacm2016-abstract.html">How to cite</a></li>
                            </ul>
                      </div>
                        <div class="shivizexample">
                        <!--
                          <img src="images/shiviz-example.png" style="padding-top: 0px;"/><br/>
                          <img src="images/event-selection.png"/><br/>
                          <img src="images/process-selection.png"/><br/>
                          <img src="images/event-expand-menu.png"/><br/>
                          <img src="images/search.png"/><br/>
                          <img src="images/diff.png"/><br/>
                          <img id="clusterImg" src="images/cluster.png"/>
                          <img src="images/motifs.png">
                          -->
                        </div>
                      </div>
                  </section>

                  <section class="input">
                      <table>
                          <tr>
                              <td class="left">
                                  <header class="icon">
                                      <ul class="tabs">
                                          <li>h</li>
                                          <li class="active">i</li>
                                          <li class="disabled">a</li>
                                      </ul>
                                  </header>
                                  <h3>Options</h3>
                                  <div id="file_input">
                                      <label>Select a file: <input type="file" id="file"></label>
                                      <span id="file_icon">d</span>
                                      <div id="file_desc">Upload a log by selecting a file with the following format: <br><br>
                                      <li> The first line of the file is the log parsing regular expression. If left empty, the default regular expression 
                                      <span class="regex">"(?&ltevent&gt.*)\n(?&lthost&gt\S*) (?&ltclock&gt{.*})"</span> will be used.<br>
                                      <li> The second line of the file is the multiple executions regular expression delimiter. This can be left empty if the log does not contain multiple executions. <br>
                                      <li> The rest of the file is the log.
                                      </div>
                                  </div>                    
                                  <div class="option">
                                      <label>Log parsing regular expression:
                                          <div id="file_desc">Upload a log by selecting a file with the following format: <br><br>
                                              <li> The first line of the file is the log parsing regular expression. If left empty, the default regular expression 
                                              <span class="regex">"(?&ltevent&gt.*)\n(?&lthost&gt\S*) (?&ltclock&gt{.*})"</span> will be used.<br>
                                              <li> The second line of the file is the multiple executions regular expression delimiter. This can be left empty if the log does not contain multiple executions. <br>
                                              <li> The rest of the file is the log.
                                          </div>
                                          <input class="mono" type="text" id="parser">
                                          <p class="notification_text" id="log-parsing">	
                                              &#9888; We automatically added "^" to the start and "$" to the end of the expression.
                                          </p>                           
                                      </label>
                                  </div>
                                  <div class="option">
                                      <label>Multiple executions regular expression delimiter:
                                          <input class="mono" type="text" id="delimiter">
                                          <p class="notification_text" id="multi-exec">	
                                              &#9888; We automatically added "^" to the start and "$" to the end of the expression.
                                          </p>     
                                      </label>
                                  </div>
                                  <div class="option">
                                      Sort processes in
                                      <select id="ordering">
                                          <option value="ascending">ascending</option>
                                          <option value="descending" selected>descending</option>
                                      </select> order by:
                                      <br>
                                      <label><input id="hostsortLength" name="host_sort" type="radio" value="length"> # events</label>
                                      <label><input id="hostsortOrder" name="host_sort" type="radio" checked value="order"> appearance in log</label>
                                  </div>
                                  <button id="visualize" disabled>Visualize</button>
                              </td>
                              <td class="right">
                                  
                                  <div id="examples">
                                    <b>Example logs:</b>
                                    <a class="log-link" href="" data-log="simple-reliable-broadcast.log" data-ordering="ascending" data-hostsort="#hostsortOrder" data-parser="\[\w+\] \[(?<date>([^ ]+ [^ ]+))\] [^ ]+ \[akka://Broadcast/user/(?<host>\w+)\] (?<clock>.*\}) (?<event>.*)">Reliable broadcast</a>
                                    <a class="log-link" href="" data-log="chord.log" data-ordering="descending" data-hostsort="#hostsortLength" data-parser="(?<host>\S*) (?<clock>{.*})\n(?<event>.*)">Chord DHT</a>
                                    <a class="log-link" href="" data-log="tsviz_fslock_24t_4sp.log" data-ordering="descending" data-hostsort="#hostsortLength" data-parser="(?<timestamp>(\d*)) (?<event>.*)\n(?<host>\w*) (?<clock>.*)">WiredTiger KV-store lock contention</a>
                                    <a class="log-link" href="" data-log="tsviz_shared_var_4_threads.log" data-ordering="descending" data-hostsort="#hostsortLength" data-parser="(?<timestamp>(\d*)) (?<event>.*)\n(?<host>\w*) (?<clock>.*)">WiredTiger shared variable contention</a>
                                    <a class="log-link" href="" data-log="voldemort-simple-threadnames.log" data-parser="\[(?<date>\d{4}-\d{2}-\d{2} (\d{2}:){2}\d{2},\d{3}) (?<path>\S*)\] (?<priority>(INFO|WARN)) (?<event>.*)\n(?<host>\S*) (?<clock>{.*})">Voldemort</a>
                                    <a class="log-link" href="" data-log="simpledb.log" data-parser="(?<event>.*)\n(?<host>\S*) (?<clock>{.*})">SimpleDB</a>
                                    <a class="log-link" href="" data-log="CPSC416-2018W1-P2-Slack/execution2.log" data-parser="(?<host>\S*) (?<clock>{.*})\n(?<event>.*)">Distributed slack</a>
                                    <a class="log-link" href="" data-log="CPSC416-2018W1-P1-RFS/execution3.log" data-parser="(?<host>\S*) (?<clock>{.*})\n(?<event>.*)">RecordsFS</a>
                                    <a class="log-link" href="" data-log="CPSC416-2017W2-P2-Twittor/execution3.log" data-parser="(?<host>\S*) (?<clock>{.*})\n(?<event>.*)">TwitToR</a>
                                    <a class="log-link" href="" data-log="facebook.log" data-parser="(?<ip>(\d{1,3}\.){3}\d{1,3}) (?<date>(\d{1,2}/){2}\d{4} (\d{2}:){2}\d{2} (AM|PM)) (?<action>(INFO|GET|POST)) (?<event>.*)\n(?<host>\w*) (?<clock>.*)">Data-center lad balancer (synth)</a>
                                    <a class="log-link" href="" data-log="facebook-multiple.log" data-delimiter="^=== (?<trace>.*) ===$" data-parser="(?<ip>(\d{1,3}\.){3}\d{1,3}) (?<date>(\d{1,2}/){2}\d{4} (\d{2}:){2}\d{2} (AM|PM)) (?<action>(INFO|GET|POST)) (?<event>.*)\n(?<host>\w*) (?<clock>.*)">Multi-execution (synth)</a>
                                    <a class="log-link" href="" data-log="multiple-comparison.log" data-delimiter="^=== (?<trace>.*) ===$" data-parser="(?<ip>(\d{1,3}\.){3}\d{1,3}) (?<date>(\d{1,2}/){2}\d{4} (\d{2}:){2}\d{2} (AM|PM)) (?<action>(INFO|GET|POST)) (?<event>.*)\n(?<host>\w*) (?<clock>.*)">Comparison log (synth)</a>
                                    <a class="log-link" href="" data-log="ewd998.log" data-delimiter="^=== (?<trace>.*) ===$" data-parser='^State [0-9]+: <(?<event>\w*) .*>\n\/\\ Host = (?<host>.*)\n\/\\ Clock = "(?<clock>.*)"\n\/\\ active = (?<active>.*)\n\/\\ color = (?<color>.*)\n\/\\ counter = (?<counter>.*)'>EWD998 from TLA+</a>
                                  </div>
                                  
                                  <textarea id="input" spellcheck="false">${errorTraceJsonLogsString}</textarea>
                              </td>
                          </tr>
                      </table>
                  </section>

                  <section class="visualization">
                      <div class="left">
                          <div class="bg"></div>
                          <header class="icon" style="width: 264pt;">
                              <ul class="tabs">
                                  <li>h</li>
                                  <li>i</li>
                                  <li class="active">a</li>
                              </ul>
                          </header>
                          <div id="tabs"></div>
                          <ul class="leftTabLinks">
                            <li class="default"><a href="logTab">Log lines</a></li>
                            <!-- PeasyViz Change - Made the motifs tab absolutely positioned left more -->
                            <li style="left: 9em;"><a href="motifsTab">Motifs</a></li>
                            <li><a href="clusterTab">Clusters</a></li>
                          </ul>
                          <div id="leftTabContent">
                              <div id="logTab">
                                  <table class="log">
                                      <tr></tr>
                                  </table>
                              </div>
                              <div id="clusterTab">
                                  <div id="clusterOption">
                                      <p>Cluster executions by:</p>
                                      <input id="clusterNumProcess" type="checkbox">
                                      <label>number of processes</label><br>
                                      <input id="clusterComparison" type="checkbox">
                                      <label>execution comparison</label>
                                  </div>
                                  <table class="clusterResults">
                                      <tr>
                                          <td><label id="baseLabel">Base execution:</label></td>
                                          <td>
                                              <select class="clusterBase">
                                                  <option id="placeholder" style="display:none" selected>Select a base execution</option>
                                              </select>
                                          </td>
                                      </tr>
                                  </table>
                              </div>
                              <div id="motifsTab">
                                  <div id="motifOption">
                                      <p>Find network motifs:</p>
                                      <input id="twoEvents" type="checkbox">
                                      <label>2-event motifs</label><br>
                                      <input id="threeEvents" type="checkbox">
                                      <label>3-event motifs</label><br>
                                      <input id="fourEvents" type="checkbox">
                                      <label>4-event motifs</label>
                                  </div>
                                  <table class="motifResults">
                                      <tr></tr>
                                  </table>
                              </div>
                          </div>
                          <div class="highlight"></div>
                      </div>
                      <div id="graph">
                          <div id="searchbar">
                              <div id="bar">
                                  <input type="text" class="mono" placeholder="Search the visualization">
                                  <div class="clear">
                                      <div class="one"></div>
                                      <div class="two"></div>
                                  </div>
                                  <button id="searchButton" disabled>Search</button>
                                  <button class="nav" id="prevButton">&lt;</button>
                                  <span class="nav" id="numFound">3</span>
                                  <button class="nav" id="nextButton">&gt;</button>
                              </div>
                              <div id="panel">
                                  <ul class="searchTabLinks">
                                      <li class="default"><a href="searchHistoryTab">Search History</a></li>
                                      <li><a href="textTab">Text Search</a></li>
                                      <li><a href="structuredTab">Structured Search</a> </li>
                                  </ul>
                                  <div id="searchHistoryTab" class="searchHistoryTab">
                                  </div>
                                  <div id="textTab" class="tab">
                                      <b>Text search</b>: search for log lines/events that match a text query.
                                      <div class="out">
                                          <p>
                                              <dl>
                                                  <dt><b>Examples:</b></dt>
                                                  <dt><code>sync</code></dt>
                                                  <dd>Find events containing the text "sync" in any field.</dd>
                                                  <dt><code>priority=CRITICAL &amp;&amp; text=/fail.*/</code></dt>
                                                  <dd>Find events with "priority" field set to "CRITICAL" and with "text" field matching the specified regex. Supported logical operators are: <code>&amp;&amp;</code>, <code>||</code>, <code>^</code></dd>
                                                  <dt><code>ip="216.58.216.174"</code></dt>
                                                  <dd>String literals containing non-alphanumeric symbols must be surrounded by quotes.</dd>
                                                  <dt><code>location="EC2" || (isMobile &amp;&amp; useragent=/.*Webkit.*/)</code></dt>
                                                  <dd>Use parenthesis to specify order of operations.</dd>
                                              </dl>
                                          </p>
                                      </div>
                                  </div>
                                  <div id="structuredTab" class="tab">
                                      <ul class="structuredSearches">
                                          <li id="customStructure">
                                              <b>Search for a custom structure:</b>
                                              draw a graph structure below (add
                                              processes, events, click and drag to
                                              add inter-event edges).<br>
                                              <div class="hostConstraintDialog">
                                                  <input id="hostConstraint" type="text" placeholder="Add constraint">
                                              </div>
                                              <table>
                                                  <tr>
                                                      <td>
                                                          <svg>
                                                              <circle r="5" class="hover"></circle>
                                                          </svg>
                                                      </td>
                                                      <td>
                                                          <button id="addButton" class="add">+</button>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </li>
                                          <li id="predefinedStructure">
                                              <b>Search for a pre-defined structure:</b>
                                              Select one of the options below to find
                                              the specified structure.
                                              <div class="predefined">
                                                  <button name="request-response">Request-response</button>
                                                  <button name="broadcast">Broadcast</button>
                                                  <button name="gather">Gather</button>
                                              </div>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div id="hostBar"></div>
                          <div id="vizContainer"></div>
                      </div>
                      <div id="sidebar">
                          <button class="pairwiseButton">Pairwise</button>
                          <button class="diffButton">Show Differences</button>
                          <div class="info">
                              <div class="event"></div>
                              <table class="fields"></table>
                          </div>
                      </div>

                      <div class="dialog">
                          <div class="triangle"></div>
                          <div class="name"></div>
                          <table class="info"></table>
                          <button name="toggle fields" class="show-fields">Show More</button>
                          <button name="hide" class="hide hb">Hide</button>
                          <button name="filter" class="filter hb">Highlight</button>
                          <button name="collapse" class="collapse">Toggle Collapse</button>
                      </div> 
                  </section>

                  <div id="errorbox" class="error"></div>
                  <div id="errorcover" class="error"></div>

                  <svg id="defs">
                      <defs>
                          <linearGradient id="gedge">
                              <stop stop-color="#999" offset="0" />
                              <stop stop-color="#fff" offset="1" />
                          </linearGradient>
                      </defs>
                  </svg>
                  

                  <!-- REPLACED DURING DEPLOYMENT: -->
                  <script type="text/javascript" src="${shivizScriptsUriMap["dev"]}"></script>
                  <!-- -->
                  
                  <script type="text/javascript" src="${shivizScriptsUriMap["searchBar"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["clusterer"]}"></script>

                  <script type="text/javascript" src="${shivizScriptsUriMap["graphEvent"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["abstractGraph"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["abstractNode"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["graphTraversal"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["dfsGraphTraversal"]}"></script>
                  
                  <script type="text/javascript" src="${shivizScriptsUriMap["builderGraph"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["builderNode"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["graphBuilder"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["graphBuilderHost"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["graphBuilderNode"]}"></script>

                  <script type="text/javascript" src="${shivizScriptsUriMap["lemAST"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["lemInterpreter"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["lemParser"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["lemToken"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["lemTokenizer"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["logEventMatcher"]}"></script>

                  <script type="text/javascript" src="${shivizScriptsUriMap["logEvent"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["modelGraph"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["modelNode"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["parser"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["vectorTimestamp"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["vectorTimestampSerializer"]}"></script>

                  <script type="text/javascript" src="${shivizScriptsUriMap["motif"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["motifFinder"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["motifDrawer"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["broadcastGatherFinder"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["customMotifFinder"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["motifGroup"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["motifNavigator"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["requestResponseFinder"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["textQueryMotifFinder"]}"></script>

                  <script type="text/javascript" src="${shivizScriptsUriMap["shiviz"]}"></script>

                  <script type="text/javascript" src="${shivizScriptsUriMap["transformation"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["collapseSequentialNodesTransformation"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["hideHostTransformation"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["highlightHostTransformation"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["highlightMotifTransformation"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["showDiffTransformation"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["transformer"]}"></script>

                  <script type="text/javascript" src="${shivizScriptsUriMap["exception"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["regexp"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["util"]}"></script>

                  <script type="text/javascript" src="${shivizScriptsUriMap["generateShiVizCompatibleInput"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["generateVectorClock"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["trexParser"]}"></script>

                  <script type="text/javascript" src="${shivizScriptsUriMap["controller"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["global"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["hostPermutation"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["layout"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["view"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["visualEdge"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["visualGraph"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["visualNode"]}"></script>
                  <script type="text/javascript" src="${shivizScriptsUriMap["abbreviation"]}"></script>
              </body>
              </html>`;
};

export default shivizSourceHtml;
