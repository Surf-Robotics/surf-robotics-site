// === SURF ROBOTICS — BLOG JS ===

// --- FILTER ---
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-grid .blog-card');
const featuredPost = document.querySelector('.featured-post');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    blogCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Show/hide featured post
    if (featuredPost) {
      const featuredCat = featuredPost.dataset.category;
      featuredPost.style.display = (filter === 'all' || featuredCat === filter) ? '' : 'none';
    }
  });
});

// --- POST CONTENT ---
const posts = {
  'post-mecanum': {
    tag: 'Build Season',
    date: 'May 2, 2026',
    author: 'James Kim & Maya Rodriguez',
    readTime: '8 min read',
    title: "Finalizing Mk IV's Drivetrain: Why We Switched to Mecanum",
    content: `
      <p>For three seasons, Surf Robotics ran a reliable 4-wheel tank drive. It was simple, powerful, and we knew how to tune it. So why did we blow it all up for Mecanum this year?</p>
      <h4>The Problem With Tank Drive in This Year's Game</h4>
      <p>The 2026-27 game field requires robots to navigate around a center structure from multiple approach angles, pick up game pieces scattered across the field, and deliver them to goals on both sides. With tank drive, every repositioning move costs precious seconds — you have to point-turn, re-align, re-engage.</p>
      <p>After our strategy sprint in September, we calculated that a mecanum drive would save us approximately 1.2–1.8 seconds per scoring cycle. Over a 2:30 teleop period, that's potentially 4–6 additional cycles. That's enormous.</p>
      <h4>The Tradeoffs We Had to Accept</h4>
      <p>Mecanum isn't free. The rollers are weaker under lateral loads, tuning requires more sophisticated PID control, and strafing consumes more battery. We spent two weeks prototyping a test chassis and stress-testing the motor outputs before committing.</p>
      <p>The breakthrough came when Priya implemented a field-centric drive mode using our IMU. With <code>imu.getRobotYawPitchRollAngles()</code> and a rotation matrix applied to the driver joystick inputs, the robot now drives relative to the field — not itself. It's a game changer for driver comfort.</p>
      <h4>The Saturday We Almost Quit</h4>
      <p>Three weeks into the build, we had terrible drift at high speed. One corner wheel assembly was vibrating. Dylan, who drives the robot, said it felt "like driving on ice." We spent an entire Saturday tearing it apart, re-shimming all four gearboxes, and re-torquing every bolt.</p>
      <p>By 9pm, it was smooth. Dylan's first words after driving it: "Okay. We're keeping mecanum."</p>
      <h4>What We'd Do Differently</h4>
      <p>We'd invest in the wheel quality earlier. Our first set of mecanum wheels had inconsistent roller durometers. Spending more on quality wheels up front would have saved us that horrible Saturday. Lesson learned.</p>
    `
  },
  'post-stemday': {
    tag: 'Outreach',
    date: 'Apr 18, 2026',
    author: 'Sofia Nguyen',
    readTime: '4 min read',
    title: 'Coastal Kids STEM Day 2026 Recap',
    content: `
      <p>This April, we hosted our third annual Coastal Kids STEM Day at Pacific Shores Elementary — and it was the biggest one yet. Over 80 third and fourth graders rotated through six activity stations across a full school day.</p>
      <h4>What We Set Up</h4>
      <p>Each station was designed to be hands-on within 60 seconds of sitting down. We had a robot driving demo, a basic circuit building station, a block coding activity using Scratch, a 3D printing show-and-tell, a structural engineering challenge with popsicle sticks, and a "meet the mentors" panel with two local engineers.</p>
      <h4>The Robot Was a Hit</h4>
      <p>Unsurprisingly, letting kids drive the robot was the most popular station. We had to add a second driver controller halfway through the day because the line was too long. One kid — probably 8 years old — got the robot to score a game piece on her first try and screamed. Best moment of the year, honestly.</p>
      <h4>Looking Forward</h4>
      <p>We're already planning next year's event with a goal of 150 students and a new "design your own robot" sketching activity. If you want to volunteer or sponsor the event, reach out to us through the Outreach page.</p>
    `
  },
  'post-q2': {
    tag: 'Competition',
    date: 'Mar 30, 2026',
    author: 'Team Surf',
    readTime: '6 min read',
    title: 'Regional Qualifier #2 Results — Bay Area Open',
    content: `
      <p>We came, we competed, and we came home with hardware. Here's the full story from the Bay Area Open Regional Qualifier.</p>
      <h4>Match Summary</h4>
      <p>We played 8 qualification matches, going 6-2. Both losses came in the morning session when our autonomous routine experienced a localization error on the near-side of the field. James diagnosed it at lunch — a gyro drift issue we'd seen before but thought we'd fixed. A quick re-calibration sorted it out.</p>
      <p>Our average teleop score across all matches was 87 points, which put us solidly in the top 5 for teleop performance. Our 30-second autonomous routine scored 42 points reliably — the second-highest autonomous score of the tournament.</p>
      <h4>Innovate Award</h4>
      <p>The judges were particularly interested in our AprilTag vision pipeline and field-centric drive mode. Priya and James gave a 10-minute technical presentation at the judging table and apparently impressed the panel. The Innovate Award was unexpected — and hugely appreciated.</p>
      <h4>Next Steps</h4>
      <p>With two qualifier advances, we're heading to the Regional Championship in March. Our focus between now and then: cleaning up our end-game hang mechanism (currently 60% reliability) and tuning our alliance strategy for coordination.</p>
    `
  },
  'post-vision': {
    tag: 'Tech Deep Dive',
    date: 'Mar 12, 2026',
    author: 'Priya Mehta',
    readTime: '12 min read',
    title: 'How We Built Our AprilTag Vision Pipeline',
    content: `
      <p>When I joined Surf Robotics two years ago, our autonomous was pure dead-reckoning — encoders and a gyro, hoping for the best. This season we built a real vision-based localization system. Here's how it works.</p>
      <h4>Why AprilTags?</h4>
      <p>FTC fields have AprilTag fiducial markers at known positions. By detecting them with a camera, you can compute your robot's precise position and heading relative to the field — much more accurate than encoders alone, which drift over time due to wheel slip.</p>
      <h4>The Camera Setup</h4>
      <p>We use a Logitech C920 mounted at the front of the robot at a 20° upward tilt. The camera connects to the Control Hub via USB. We calibrate it using a checkerboard and OpenCV's <code>calibrateCamera()</code> function every time we change the mount position.</p>
      <h4>The Pipeline</h4>
      <p>Each frame from the camera is processed through our custom <code>AprilTagPipeline</code> class. It uses OpenCV's apriltag detector with the <code>tag36h11</code> family. The detected tag corners are used to solve a PnP problem — giving us a 3D pose (translation + rotation) of the tag relative to the camera. We then invert the transform using the known tag positions on the field to get our robot's absolute position.</p>
      <p>The resulting pose estimate is fed into a complementary filter alongside our odometry estimate. On a fresh field, we're seeing localization accuracy within ±2 cm. Good enough to consistently score from autonomous.</p>
      <h4>Lessons Learned</h4>
      <p>Exposure matters a lot. Under match lighting, our first configuration caused motion blur. We locked the camera exposure to 1/500s and dropped frame rate to 30fps for consistency. Also: always validate your camera intrinsics on the actual robot, not just at a desk.</p>
    `
  },
  'post-q1': {
    tag: 'Competition',
    date: 'Feb 22, 2026',
    author: 'Team Surf',
    readTime: '5 min read',
    title: 'Qualifier #1 — Coastal League: We Got a Think Award!',
    content: `
      <p>Our first competition of the 2026-27 season is in the books. We ranked 3rd out of 18 teams and took home the Think Award for our engineering documentation. Here's how it went.</p>
      <h4>Morning Struggles</h4>
      <p>We almost missed our first match because of a loose REV cable connector — something we've since added to our pre-match checklist. Dylan caught it in the pits 4 minutes before our first match call. Aiden fixed it in 90 seconds. Disaster averted.</p>
      <h4>Autonomous Performance</h4>
      <p>Our autonomous scored 38 points in 6 of our 7 matches. The one exception: we mis-detected an AprilTag under the glare of a light directly above the near-side goal. We've since added an exposure-lock override in our init sequence.</p>
      <h4>Think Award</h4>
      <p>The Think Award recognizes exceptional engineering documentation. Maya and Lily's notebook work this season has been incredible — detailed CAD iteration logs, failure mode analysis, and clear design rationale. It clearly resonated with the judges. We're proud of this one.</p>
    `
  },
  'post-slides': {
    tag: 'Build Season',
    date: 'Jan 28, 2026',
    author: 'Maya Rodriguez & Lily Torres',
    readTime: '7 min read',
    title: 'Linear Slides vs. Arm: Making the Big Decision',
    content: `
      <p>Every season there's one decision that defines your robot. This year, it was the scoring mechanism: a rotating arm or a linear slide system.</p>
      <h4>The Case for an Arm</h4>
      <p>Arms are mechanically simpler. One pivot motor, one wrist servo, done. They're also faster to prototype and debug. Three members of the team wanted an arm, citing our experience with it from Mk II.</p>
      <h4>The Case for Linear Slides</h4>
      <p>This season's goals require reaching 36 inches above the floor. An arm at that extension length would need either a very long arm (heavy, slow) or a complex compound geometry. Linear slides can be stacked and driven with a single motor, keeping weight down and motion predictable.</p>
      <h4>How We Decided</h4>
      <p>We built a quick test jig for both configurations using scrap aluminum and ran 50 cycle time trials each. Slides averaged 2.8 seconds per cycle to the high goal. Arm averaged 3.4 seconds with the necessary reach. Slides won on data. The team agreed to go with the data over intuition — which is exactly the kind of team culture we've been building.</p>
    `
  },
  'post-kickoff': {
    tag: 'Team Life',
    date: 'Jan 10, 2026',
    author: 'Dylan Walsh',
    readTime: '5 min read',
    title: 'Game Kickoff Day: 24 Hours of Controlled Chaos',
    content: `
      <p>Game reveal was a Friday at 10am. By Sunday night at midnight, we had a strategy, a robot concept, and a build calendar. Here's what that weekend looked like.</p>
      <h4>Friday: The Reveal</h4>
      <p>We watched the game reveal together at Mr. Sandoval's classroom with snacks and a whiteboard. The first 30 minutes was just everyone yelling at each other about which scoring objectives are most valuable. Sofia recorded all of it for the notebook. We went home with homework: watch the game animation 3 more times and write down your top 3 strategic observations.</p>
      <h4>Saturday: Strategy Sprint</h4>
      <p>All day Saturday. We started with everyone sharing their observations, then ran a structured point-value analysis — how many points is each objective worth, how hard is it to execute, what's the likely competition landscape. By 6pm we had our strategy framework.</p>
      <h4>Sunday: Concept Day</h4>
      <p>Three sub-teams worked in parallel: drivetrain, scoring mechanism, software plan. We reconvened at 9pm, debated the tradeoffs, and committed to our concept. The drive home that Sunday felt electric. That feeling is why we do this.</p>
    `
  },
  'post-fll': {
    tag: 'Outreach',
    date: 'Dec 5, 2025',
    author: 'Sofia Nguyen',
    readTime: '6 min read',
    title: 'Mentoring Our First FLL Team — What We Learned',
    content: `
      <p>This season we took on the role of mentor team for a local FLL team — the Pacific Gears, a group of 10- and 11-year-olds from a nearby elementary school. It was humbling, rewarding, and a little bit chaotic.</p>
      <h4>What We Thought Mentoring Would Be</h4>
      <p>We figured we'd show up, share some knowledge, maybe help them tune a motor. Easy. We were very wrong.</p>
      <h4>What It Actually Was</h4>
      <p>FLL kids have infinite energy and very short attention spans. Our first session lasted 2 hours and we barely got through the basics of the engineering design process. We had to completely rethink how we communicate ideas — forget the technical vocabulary, start with questions, let them discover things.</p>
      <h4>What We Got Out of It</h4>
      <p>Honestly? A much deeper understanding of our own process. Explaining why you make a decision forces you to articulate reasoning you normally take for granted. Three of our members said mentoring the FLL team made them better engineers. We're definitely doing it again next year, and expanding to two teams.</p>
    `
  },
  'post-rr': {
    tag: 'Tech Deep Dive',
    date: 'Nov 18, 2025',
    author: 'James Kim',
    readTime: '10 min read',
    title: 'Road Runner 101: Getting Smooth Autonomous Paths',
    content: `
      <p>Road Runner is the go-to motion planning library for FTC autonomous routines. Here's how we integrated it and the lessons we learned the hard way.</p>
      <h4>What Road Runner Does</h4>
      <p>Road Runner generates smooth, constrained trajectories for your robot — instead of "drive forward 24 inches, turn 90 degrees," you get a continuous spline path that the robot follows at a controlled velocity. The result is much faster and more accurate autonomous execution.</p>
      <h4>Getting the Tuning Right</h4>
      <p>Tuning is the hard part. You need to measure and input your robot's physical parameters: track width, wheel radius, gear ratio. Then you run a series of tuning procedures — first straight-line forward/backward to get lateral distance tuning, then spinning in place to tune your track width empirically.</p>
      <p>We spent 3 days on tuning and it was worth every minute. Our final trajectory following error is under ±1.5 cm, which is sufficient for consistent game piece pickup.</p>
      <h4>Building Trajectories</h4>
      <p>Trajectories are built using Road Runner's <code>TrajectorySequenceBuilder</code>. You chain together <code>lineTo()</code>, <code>splineTo()</code>, <code>turn()</code>, and <code>waitSeconds()</code> calls. We wrap each season's paths in a <code>Paths</code> class so the autonomous OpModes stay clean.</p>
      <p>One tip: use <code>UNSTABLE_addTemporalMarker()</code> to trigger mechanism actions (like extending your slides) at precise times within a trajectory, rather than stopping the path to wait. It shaves significant time off your auto.</p>
    `
  },
  'post-welcome': {
    tag: 'Team Life',
    date: 'Oct 30, 2025',
    author: 'Team Surf',
    readTime: '3 min read',
    title: 'Welcome to the Team, Class of 2026!',
    content: `
      <p>Every season brings new energy, new ideas, and new people. This year we're thrilled to welcome four new members to Surf Robotics.</p>
      <h4>Ryan Chen — Fabrication</h4>
      <p>"I've been using the school's CNC router for personal projects for two years. Joining Surf Robotics means I finally get to make things that actually do something in competition. Can't wait."</p>
      <h4>Priya Mehta — Software</h4>
      <p>"I came to robotics from competitive programming. I'm excited to see what path planning and computer vision look like in a real physical system — not just on a screen."</p>
      <h4>Lily Torres — CAD Design</h4>
      <p>"I've been doing Onshape tutorials all summer. I want to design the mechanisms that the team actually builds. There's something amazing about seeing your sketch become a physical object."</p>
      <h4>Aiden Park — Electronics</h4>
      <p>"Wiring has always been my thing. My bedroom has a soldering station. I'm here to make sure Surf Bot's electronics are bulletproof."</p>
      <p>Welcome, all four of you. This team is better because you're here.</p>
    `
  }
};

// --- MODAL ---
const postModal = document.getElementById('postModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

function openPost(postId) {
  const post = posts[postId];
  if (!post) return;

  modalBody.innerHTML = `
    <span class="blog-tag">${post.tag}</span>
    <h2>${post.title}</h2>
    <div class="post-meta">
      <span>${post.author}</span>
      <span>${post.date}</span>
      <span>${post.readTime}</span>
    </div>
    ${post.content}
  `;
  postModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  postModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', () => openPost(btn.dataset.post));
});

modalClose && modalClose.addEventListener('click', closeModal);
modalOverlay && modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
