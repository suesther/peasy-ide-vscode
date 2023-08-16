<style>
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
  
</style>

<div align="center">
  <h2>Peasy State Machine Visualizations</h2>
</div>

Many P users wanted a way of creating visualizations of state machines in P to help supplement design documents, visualize P code, and help to better understand the way P state machines worked. With the help of the open source tool Stately's State Machine Visualization, that dream is now realized.

In order to create visualizations of P state machines, follow these steps or scroll down to watch the tutorial:

1. First, select the P project you want to work with. (If you are already working in a directory with just one P project, then skip this step.) Otherwise, press ++f6++ and select the project you would like to visualize.
2. Now, press ++f7++ to run the command `p compile --mode stately` in the terminal. Your visualization code is generated! A message in red should be sent through the terminal.
   ![Syntax Highlighting](../images/code_generation_text.png)
3. Navigate to the file using ++ctrl++ `Click` or ++cmd++ `Click`. Copy-and-paste the file contents into https://stately.ai/viz.
4. Click the Visualize button on the bottom left!

Voila! Here is an example visualization using the P Tutorial's Two Phase Commit Project.
![Visualization](../images/visualization.png)

<div align="center">
  <h2>How to Navigate Stately's Open Source Visualization Website</h2>
</div>

Every visualization contains exactly one state machine. The name of the machine is at the top left; in this case, the machine is called `Coordinator`. All the shapes and arrows inside are part of the state machine `Coordinator`.

States are represented with squares, and events are represented with ovals.The beginning state is pointed to with an arrow. In the above case, the beginning state is `Init`.

The state WaitForTransaction is outlined in blue because the machine always travelled from the `Init` State to the WaitForTransaction state. The event `eTransReq` is colored in light blue because the state machine `Coordinator` is waiting for that one event to happen. Click `eWhileTransReq`, and the three other events will light up because the `Coordinator` machine is now waiting for one of the other three events to happen.

This way, P users can interact with these P state machine visualizations too!

Stately's website contains four tabs:

- **Code Tab**: Users use this tab to copy-and-paste code to visualize state machines.
- **State Tab**: This tab provides information on the state the user is currently at in the machine.
- **Events Tab**: This tab logs all of the events that have occured so far among all machines.
- **Actors Tab**: Users can switch between different machines' visualizations in this tab.

The state WaitForTransaction is outlined in blue

<div align="center">
  <h2>State Machine Visualization Tool Tutorial</h2>
</div>
<figure class="video_container">
  <video controls="true" allowfullscreen="true" >
    <source src="../../videos/visualization.mov" type="video/mp4">
  </video>
</figure>