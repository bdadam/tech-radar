//This is the title for your window tab, and your Radar
document.title = "Autoscout24 Technology Radar (Q1 2016)";


//This is the concentic circles that want on your radar
var radar_arcs = [
    {'r': 100, 'name': 'Adopt'}
    , {'r': 200, 'name': 'Trial'}
    , {'r': 300, 'name': 'Assess'}
    , {'r': 400, 'name': 'Hold'}
    // ,{'r':500,'name':'Possible Extra if you want it'}
];

//This is your raw data
//
// Key
//
// movement:
//   t = moved
//   c = stayed put
//
// blipSize:
//  intValue; This is optional, if you omit this property, then your blip will be size 70.
//            This give you the ability to be able to indicate information by blip size too
//
// url:
// StringValue : This is optional, If you add it then your blips will be clickable to some URL
//
// pc: polar coordinates
//     r = distance away from origin ("radial coordinate")
//     - Each level is 100 points away from origin
//     t = angle of the point from origin ("angular coordinate")
//     - 0 degrees is due east
//
// Coarse-grained quadrants
// - Techniques: elements of a software development process, such as experience design; and ways of structuring software, such micro-services.
// - Tools: components, such as databases, software development tools, such as versions control systems; or more generic categories of tools, such as the notion of polyglot persistance.
// - Platforms: things that we build software on top of: mobile technologies like Android, virtual platforms like the JVM, or generic kinds of platforms like hybrid clouds
// - Programming Languages and Frameworks
//
// Rings:
// - Adopt: blips you should be using now; proven and mature for use
// - Trial: blips ready for use, but not as completely proven as those in the adopt ring; use on a trial basis, to decide whether they should be part of your toolkit
// - Assess: things that you should look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you
// - Hold: things that are getting attention in the industry, but not ready for use; sometimes they are not mature enough yet, sometimes they are irredeemably flawed
//      Note: there's no "avoid" ring, but throw things in the hold ring that people shouldn't use.

var h = 900;
var w = 1600;

var radar_data = [
    {
        "quadrant": "Techniques",
        "left": 45,
        "top": 18,
        "color": "#8FA227",
        "items": [
            {"name": "Pre-compute as much as you can", "pc": {"r": 84, "t": 100}, "movement": "c", "url": "", "explanation": "Many parts of our web site are read heavy, so in a lot of places it makes sense to pre-compute instead of reacting to a request. Examples would be change propagation for listings, static content and CQRS" },
            {"name": "Two-Factor auth. for everyone where possible", "pc": {"r": 83, "t": 122}, "movement": "c", "url": "", "explanation": "As we are using public cloud services and managed services reachable from the Internet we consider a second factor during authentication as a must-have." },
            {"name": "Shadow Traffic", "pc": {"r": 86, "t": 145}, "movement": "c", "url": "", "explanation": "Testing new services with natural traffic has proven to be a reliable method. Replicating traffic to the shadowed system is easy to implement." },
            {"name": "Game Day Exercises", "pc": {"r": 88, "t": 170}, "movement": "c", "url": "http://blog.cognitect.com/blog/2016/3/3/the-new-normal-minimize-risk-by-maximizing-change", "explanation": "We want to avoid the 'backup without recovery' or the 'untested disaster readiness plan'. We should excercise our disaster recovery strategy regularly and have game days with different kinds of disasters." },
            {"name": "Blue/Green Deployment", "pc": {"r": 55, "t": 105}, "movement": "c", "url": "", "explanation": "The idea is to have two easily switchable environments to switch between. This makes it easy to rollback (fast) when something goes wrong. Dependent on your stack the implementation can vary. For CloudFormation you can use AutoCanary24." },
            {"name": "Continuous Delivery", "pc": {"r": 60, "t": 135}, "movement": "c", "url": "", "explanation": "From continuousdelivery.com: 'Continuous Delivery is the ability to get changes of all types—including new features, configuration changes, bug fixes and experiments—into production, or into the hands of users, safely and quickly in a sustainable way.' This should be the default for every application. If Continuous Deployment (not only keeping your application in a state where it is always able to deploy into production but actually doing it) is applicable it should be used." },
            {"name": "Feature Toggles 'the proper way'", "pc": {"r": 58, "t": 165}, "movement": "c", "url": "http://martinfowler.com/articles/feature-toggles.html", "explanation": "There couldn't be a better explanation: http://martinfowler.com/articles/feature-toggles.html. Read it. Do it." },
            {"name": "Q.A. in Production", "pc": {"r": 30, "t": 120}, "movement": "c", "url": "", "explanation": "With the rise of Continuous Delivery, the QA role is shifting to include analyzing software product quality in production. This involves monitoring of the production systems, coming up with alert conditions to detect urgent errors, determining ongoing quality issues and figuring out what measurements you can use in the production environment to make this work. This does not mean that pre-production QA is not needed anymore." },
            {"name": "Infrastructure as Code", "pc": {"r": 30, "t": 150}, "movement": "c", "url": "", "explanation": "To avoid configuration drift and manual effort to scale or even update a system all infrastructure components should be version controlled." },

            {"name": "External User Journey Monitoring", "pc": {"r": 150, "t": 98}, "movement": "c", "url": "", "explanation": "" },
            {"name": "ECS Aided Deployment", "pc": {"r": 150, "t": 111}, "movement": "c", "url": "", "explanation": "Using AWS EC2 Container service to deploy docker containers as artifacts to machines reduces the burden of orchestrating the deployment steps. We try to use this also for the one container per host setup." },
            {"name": "CI Pipeline as Code", "pc": {"r": 150, "t": 123}, "movement": "c", "url": "", "explanation": "We strive to keep logic out of the build pipeline and every deployment should be runnable from the developer's machine. But still there are manual steps required and changes in the pipeline are not tracked together with the source repository. Therefore we think it is a good option to put the pipeline configuration under version control, too." },
            {"name": "Docker as artifact", "pc": {"r": 150, "t": 135}, "movement": "c", "url": "", "explanation": "Docker is offering many advantages like immutability, independence and portability. We want to profit from those, but without the burden of maintaining Docker clusters in the first hand. Therefore we currently see the Docker container mostly as a build artifact" },
            {"name": "CDCs", "pc": {"r": 150, "t": 147}, "movement": "c", "url": "", "explanation": "" },
            {"name": "Progressive Webapps", "pc": {"r": 150, "t": 159}, "movement": "c", "url": "", "explanation": "" },
            {"name": "Canary Releases", "pc": {"r": 150, "t": 172}, "movement": "c", "url": "", "explanation": "The name for this technique originates from miners who would carry a canary in a cage down the coal mines. If toxic gases leaked into the mine, it would kill the canary before killing the miners. A canary release provides a similar form of early warning for potential problems before impacting your entire production infrastructure or user base. Compared to `Feature Toggles` or `BlueGreen Deployments` this is not a simple switch but more a slider. FeatureBee (Scala) as well as AutoCanary24 support Canary Releases. You can canary release toggled features with traffic distribution or you can canary deploy new service instances with traffic distribution or shadow traffic." },

            {"name": "Decouple Build and Deploy Tool", "pc": {"r": 250, "t": 95}, "movement": "c", "url": "http://techblog.netflix.com/2016/03/how-we-build-code-at-netflix.html", "explanation": "We are currently using GoCD for CI and CD. This is convenient, as we have one place to define and see the whole pipeline. On the other hand are we limiting us to an agent based delivery. We could use one tools for CI that creates verified artifacts and use another specialized tool for delivery. This differentiation makes even more sense, when we look into container scheduler. For example Netflix uses Jenkins for CI and Spinnaker for delivery." },
            {"name": "Docker for Build Agents", "pc": {"r": 250, "t": 107}, "movement": "c", "url": "", "explanation": "Sharing build servers with other pipelines is efficient but creates a dependency to the underlying software packages. We are all dependent on the Java, Ruby etc. installations on the agents. This can lead to time-consuming coordination and broken builds. Building software in Docker containers helps to get independent of the build agent and to avoid interferences between pipelines of different services." },
            {"name": "Content Security Policy", "pc": {"r": 250, "t": 121}, "movement": "c", "url": "", "explanation": "" },
            {"name": "Visual Monitoring", "pc": {"r": 250, "t": 135}, "movement": "c", "url": "", "explanation": "As we heavily rely on our UI composition to work flawlessly and we integrate on production only, we should be certain that our pages look like they should apart from being functional. A way to achieve this is by monitoring the visual look of the page for changes." },
            {"name": "CQRS/Event Sourcing", "pc": {"r": 250, "t": 149}, "movement": "c", "url": "http://www.infoq.com/presentations/microservices-event-sourcing-cqrs", "explanation": "Command Query Responsibility Segregatin and Event Sourcing are no silver bullet. Immutable events stored in an append only fashion together with a read optimized query part make a good fit for microservices and for many use cases at AutoScout24. Don't be confused that many companies use different names for the some concepts." },
            {"name": "Background Sync (Service Worker)", "pc": {"r": 250, "t": 161}, "movement": "c", "url": "", "explanation": "" },
            {"name": "IFrame for Sandboxing", "pc": {"r": 250, "t": 175}, "movement": "c", "url": "http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/", "explanation": "Some years ago we already started trials to isolate JavaScript code written by 3rd parties from our own. Since this was not sucessful there is now a new chance with HTML5 iFrames until web components can be adopted." },

            {"name": "Data Pump 'diversity'", "pc": {"r": 350, "t": 100}, "movement": "c", "url": "", "explanation": "" },
            {"name": "Lockstep Releases", "pc": {"r": 350, "t": 120}, "movement": "c", "url": "", "explanation": "Having to synchronize releases in the team or even between teams is painful and blocks the release of urgent bugfixes or other features. We should avoid that." },
            {"name": "CMS Boxes misuse", "pc": {"r": 350, "t": 140}, "movement": "c", "url": "", "explanation": "CMS boxes are a common pattern for us. They provided a fast way to get different content on the web pages. As we are deploying more often today and have introduced UI composition to include content from different sources, we think that we should use CMS boxes for editorial content only. We should not use them for bringing advertisements or label texts on the pages." },
            {"name": "Feature Branches", "pc": {"r": 350, "t": 155}, "movement": "c", "url": "", "explanation": "Feature branches isolate your work and defer continuous integration. The longer they exist the more it hurts to merge them back. Practices like Gitflow can support such a behaviour. When the only reason to start a new branch is the fear of continuous integration and therefore continuous deployment stop it." },
            {"name": "Custom Basic Authentication", "pc": {"r": 350, "t": 170}, "movement": "c", "url": "", "explanation": "While we are in our migration phase from the datacenter to the cloud not all platform services are available yet. To secure our APIs and administrative pages is hard without being able to use an identity service, therefore we have started to create workarounds by seting up custom basic authentication. We should strive to replace those solutions with proper OAuth2 implementations." }



        ]
    },
    {
        "quadrant": "Tools",
        "left": w - 300 + 30,
        "top": 18,
        "color": "#587486",
        "items": [

            {name: 'Data Dog', pc: {r: 75, t: 70}, "movement": "c", "url": "", "explanation": "We tried DataDog as metric collection and server monitoring tool. It's easy of use, the ability to ingest custom events and the low price led to the decision to adopt the tool." },
            {name: 'Akka Circuit Breaker', pc: {r: 82, t: 45}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Security Monkey', pc: {r: 35, t: 40}, "movement": "c", "url": "", "explanation": "We are using Security Monkey for auditing our security relevant resources in AWS. It has proven to be a reliable and helpful tool and led to improved overall security." },
            {name: 'Elastic Search', pc: {r: 70, t: 15}, "movement": "c", "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html", "explanation": "We are currently using ES as a search engine for implementing our core search listing experience. It is a proven tool for us and we are going to try to use more features it supports." },

            {name: 'CrossBrowserTesting.Com', pc: {r: 150, t: 82}, movement: 'c', url: "http://www.CrossBrowserTesting.Com", "explanation": ""},
            {name: 'OAuth2 for inter-service communication', pc: {r: 150, t: 66}, "movement": "c", "url": "", "explanation": "Securing APIs with OAuth2 is a common pattern in the industry, we should use it also for our services when they are communicating with each other over public networks." },
            {name: 'Kafka', pc: {r: 150, t: 50}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Chaos Monkey', pc: {r: 150, t: 36}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Percolator', pc: {r: 150, t: 22}, "movement": "c", "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/search-percolate.html", "explanation": "Inverted search: For us this would help with saved search, where we store the searches in ES and use our listing events to match saved searches and notify the users on matches. Either in realtime or when the user wants to be notified." },
            {name: 'git-secrets', pc: {r: 150, t: 7}, "movement": "c", "url": "https://github.com/awslabs/git-secrets", "explanation": "To prevent secrets leaking on GitHub we are scanning our repositories with git-secrets. Compared to gitrob this tool also scans the file contents and can work preemptively as a pre-commit hook." },


            {name: 'Instana', pc: {r: 250, t: 85}, "movement": "c", "url": "http://www.instana.com/", "explanation": "Instana is a new generation monitoring service which is currently in beta status. It's high resolution and intelligent learning technology it looks like an interesting alternative to existing solutions." },
            {name: 'Travis CI', pc: {r: 250, t: 75}, "movement": "c", "url": "", "explanation": "TravisCI is one of these tools which supports configuration as code. It's widely adopted, especially in OSS. It can be used as SaaS or On-Prem." },
            {name: 'Spinnaker', pc: {r: 250, t: 65}, "movement": "c", "url": "http://www.spinnaker.io/", "explanation": "Spinnaker is a Netflix OSS cloud deployment tool. It feels quite heavy, but seems to gain a lot of traction. We could couple a future Spinnaker trial with a Travis CI trail and completely get rid of GoCD. This would then also include the Techniques 'Decouple Build and Deploy Tool'" },
            {name: 'Docker Cluster', pc: {r: 250, t: 55}, "movement": "c", "url": "", "explanation": "Tools like Swarm, Mesos, Kubernetes or ECS promise to handle the scheduling of Docker Containers. We should keep an eye on them to be able to decide which one could be a fit for us." },
            {name: 'Elastic Search Watcher', pc: {r: 250, t: 45}, "movement": "c", "url": "https://www.elastic.co/guide/en/watcher/current/index.html", "explanation": "ES Watcher is an Elasticsearch plugin to create notifications based on the ES cluster data when some conditions occur. It can be used for further refining our alarming system or other types of notifications." },
            {name: 'Cassandra', pc: {r: 250, t: 35}, "movement": "c", "url": "http://cassandra.apache.org/", "explanation": "Highly available distributed database, with cross region replication. De facto standard for many cloud stacks, that would violate our AWS first priniciple. Only consider it, when we hit DynamoDB limitations." },
            {name: 'Hystrix', pc: {r: 250, t: 25}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Caddy Server', pc: {r: 250, t: 15}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Gulp', pc: {r: 250, t: 5}, "movement": "c", "url": "", "explanation": "" },

            {name: 'Gitrob', pc: {r: 350, t: 80}, "movement": "c", "url": "https://github.com/michenriksen/gitrob", "explanation": "We tested Gitrob to scan our repositories for leaking secrets. As Gitrob is scanning only file paths for patterns instead of the content and is also quite hard to automate, we found it to be much less helpful than git-secrets." },
            {name: 'SVN', pc: {r: 340, t: 65}, "movement": "c", "url": "", "explanation": "Even while subversion is a straight-foward version control system, it lacks in features like offline-support, pull requests and easy ways to merge and branch. Also the social coding features of GitHub.com speak for themselves." },
            {name: 'Selenium Cluster', pc: {r: 340, t: 50}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Oracle Materialized Views', pc: {r: 340, t: 37}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Codecept.js', pc: {r: 340, t: 24}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Go CD', pc: {r: 340, t: 10}, "movement": "c", "url": "", "explanation": "Even while GoCD is featured on the ThoughtWorks radar we still see a lot of effort in adding new pipelines. Also missing OAuth support, the missing support of configuration as code and fact that it doesn't scale dynamically are reasons to look for a tool that could handle these issues better." }

        ]
    },
    {
        "quadrant": "Platforms",
        "left": 45,
        "top": 570,
        "color": "#DC6F1D",
        "items": [

            {"name": "AWS Lambda", "pc": {"r": 50, "t": 205}, "movement": "c", "url": "", "explanation": "We are running multiple AWS Lambda functions already and they have proven to be a good solution for small recurring cron-like tasks, but also for massive data transfer between services." },
            {"name": "Azure AD", "pc": {"r": 50, "t": 245}, "movement": "c", "url": "", "explanation": "As we are using Office 365 already we are now integrating our SaaS tools with Azure AD authentication. This is an easy way of increasing security by avoiding to manually maintain user accounts and permissions in every single tool." },
            {"name": "CDN", "pc": {"r": 50, "t": 225}, "movement": "c", "url": "", "explanation": "During our transition phase to AWS we have the requirement to route our traffic to the datacenter or AWS. We think a CDN is the right tool for this job as it ensures low latency by making the routing decision at the edge. Apart from this and the improved page performance it is also a good option to reduce costs by offloading the traffic." },

            {"name": "Apache Spark", "pc": {"r": 150, "t": 245}, "movement": "c", "url": "http://spark.apache.org/", "explanation": "A micro-batch data processing cluster with Scala API. Famous for being faster than Hadoop and for stream processing. Potential use cases, would be in the data platform, in the log event processing and in the listing enrichment pipeline." },
            {"name": "Elastic Beanstalk", "pc": {"r": 150, "t": 205}, "movement": "c", "url": "", "explanation": "" },

            {"name": "Node.js for the backend", "pc": {"r": 250, "t": 250}, "movement": "c", "url": "", "explanation": "" },
            {"name": "HTTP/2", "pc": {"r": 250, "t": 225}, "movement": "c", "url": "https://http2.github.io/", "explanation": "Next revision of HTTP. Improves user perceived latency. Current estimations say that 50% of our users could connect via HTTP/2." },
            {"name": "Unikernel", "pc": {"r": 250, "t": 200}, "movement": "c", "url": "https://en.wikipedia.org/wiki/Unikernel", "explanation": "Minimal library OS compiled with application, that run directly on the hypervisor. Think 40-50 MB images starting in seconds on EC2. Alternative or supplement to containers." },

            {"name": "EMR for Spark", "pc": {"r": 350, "t": 225}, "movement": "c", "url": "", "explanation": "" },

        ]
    },
    {
        "quadrant": "Languages & Frameworks",
        "color": "#B70062",
        "left": (w - 300 + 30),
        "top": 540,
        "items": [
            {name: 'SCALA', pc: {r: 25, t: 310}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Ruby for automation and scripting', pc: {r: 80, t: 285}, "movement": "c", "url": "", "explanation": "At AutoScout24 ruby is the common language for automating our deployments. It's well-known in the company and is fairly easy to use even for beginners. We have already built some tooling for deployment in Ruby like autostacker24 and autocanary24." },
            {name: 'Codahale Metrics', pc: {r: 80, t: 315}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Play Framework', pc: {r: 80, t: 345}, "movement": "c", "url": "", "explanation": "" },

            {name: 'WebDriver', pc: {r: 150, t: 285}, "movement": "c", "url": "", "explanation": "" },
            {name: 'Pact CDC', pc: {r: 150, t: 305}, "movement": "c", "url": "https://github.com/realestate-com-au/pact", "explanation": "Define a pact between service consumers and providers, enabling 'consumer driven contract' testing." },
            {name: 'Akka', pc: {r: 150, t: 325}, "movement": "c", "url": "https://www.lightbend.com/community/core-projects/akka", "explanation": "Actor based runtime for reactive applications in the Scala/JVM world. We use Play for the read side of AS24 and Akka could be good fit for the write side. See Lagom, which includes Akka." },
            {name: 'EcmaScript 6 + Babel', pc: {r: 150, t: 345}, "movement": "c", "url": "", "explanation": "" },

            {name: 'Protobuf', pc: {r: 250, t: 280}, "movement": "c", "url": "", "explanation": "Fast and size optimized binary serialization format, created by Google. Has an out of band schema definition. This could be an alternative to Json in some usecases. See also Avro and MessagePack." },
            {name: 'Apache Avro', pc: {r: 250, t: 293}, "movement": "c", "url": "", "explanation": "Fast and size optimized binary rpc and serialization framework. Schema info is part of handshake. This could be an alternative to Json in some usecases. Favored by makers of Kafka. See also Protobuf and MsgPack." },
            {name: 'GO Lang for Microservices', pc: {r: 250, t: 307}, "movement": "c", "url": "", "explanation": "In the world of containers and microservices more and more companies are using Go to build their services. It's leightweight footprint and the absence of JIT-compilation make it an ideal candidate for use in a container. On the other hand it might lack some features and tools needed for web development. We should keep an eye on the development in the community." },
            {name: 'Lagom', pc: {r: 250, t: 322}, "movement": "c", "url": "https://www.lightbend.com/lagom", "explanation": "Reactive, eventsourced and CQRS based microservices on the Lightbend stack. Could be an extension of our Lightbend Play stack for microservices that are writing. See alos Akka, which is part of Lagom" },
            {name: 'MessagePack', pc: {r: 250, t: 336}, "movement": "c", "url": "", "explanation": "Fast and size optimized binary serialization format. Has no schema definition and is dynamically-typed. This could be an alternative to Json in some usecases. See also Avro and Protobuf." },
            {name: 'Python for automation', pc: {r: 250, t: 350}, "movement": "c", "url": "", "explanation": "" },

            {name: 'C#', pc: {r: 350, t: 320}, "movement": "c", "url": "", "explanation": "AutoScout's move to the Linux OS is contradictory to continue using C#. Even with Mono being available we believe that the JVM is a better choice due to it's broader adoption on Linux" }
        ]
    }
];
