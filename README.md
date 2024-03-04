> The project is built using the following technologies and frameworks:

- **TypeScript**: TypeScript is a strongly typed superset of JavaScript that adds static types to the language. It helps catch errors early during development and improves code maintainability and scalability.

- **React.js**: React.js is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently manage the state of the application.

- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined classes to style the user interface. It enables rapid development by offering a wide range of customizable styling options.

- **Redux**: Redux is a predictable state management library for JavaScript applications. It provides a centralized store to manage application state and facilitates predictable data flow and state updates.

- **Redux Toolkit**: Redux Toolkit is an official opinionated set of tools and best practices to simplify the Redux development process. It includes utilities like Redux Thunk and Redux DevTools Extension, making it easier to write Redux code and debug application state.

By combining TypeScript, React.js, Tailwind CSS, Redux, and Redux Toolkit, the project benefits from type safety, efficient UI rendering, flexible styling options, and a well-structured and manageable state management system.

---

> Frontend Architecture:

## ATOMIC DESIGN ARCHITECTURE

Atomic design is a methodology composed of five distinct stages working together to create interface design systems in a more deliberate and hierarchical manner. The five stages of atomic design are:

- Atoms
- Molecules
- Organisms
- Templates
- Pages

Atomic design is not a linear process, but rather a mental model to help us think of our user interfaces as both a cohesive whole and a collection of parts at the same time. Each of the five stages plays a key role in the hierarchy of our interface design systems.

### Atoms

Atoms are the basic building blocks of all components. Each component has distinct properties, and they can't be broken down into smaller components.<br/><br/> If atoms are the basic building blocks of components, then the atoms of our interfaces serve as the foundational building blocks that comprise all our user interfaces. These atoms include basic HTML elements like form labels, inputs, buttons, and others that can't be broken down any further without ceasing to be functional.

![atoms-form-elements](https://github.com/Raphaelmbewe/alx-pre_course/assets/66825194/d4eb0f5e-d58b-4025-bf96-3ce93f790192)

### Molecules

Molecules are groups of two or more components held together. These combinations of components take on their own unique properties and become more tangible and operational than atoms.<br/><br/>In interfaces, molecules are relatively simple groups of UI components functioning together as a unit. For example, a form label, search input, and button can join together to create a search form component.

![molecule-search-form](https://github.com/Raphaelmbewe/alx-pre_course/assets/66825194/a8db9b2d-3cd8-4557-8a2d-f28fd1a07272)

### Organisms

Organisms are assemblies of molecules functioning together as a unit. These relatively complex structures can range from single-celled organisms all the way up to incredibly sophisticated organisms like a Header.<br/><br/>Organisms are relatively complex UI components composed of groups of molecules, atoms, and/or other organisms. These organisms form distinct sections of an interface.

![organism-header](https://github.com/Raphaelmbewe/alx-pre_course/assets/66825194/86e75345-f0a5-4672-8f55-0b93fdb56d45)

### Templates

Templates are page-level objects that place components into a layout and articulate the design's underlying content structure.<br/><br/> To build on our previous example, we can take the header organism and apply it to a homepage template.<br/><br/> This homepage template displays all the necessary page components functioning together, which provides context for these relatively abstract molecules and organisms. When crafting an effective design system, it's critical to demonstrate how components look and function together in the context of a layout to prove the parts add up to a well-functioning whole.<br/><br/> Another important characteristic of templates is that they focus on the page's underlying content structure rather than the page's final content.<br/><br/> Design systems must account for the dynamic nature of content, so it's very helpful to articulate important properties of components like ${\color{red} image\ sizes\ and\ character\ lengths\ for\ headings\ and\ text\ passages.}$

![template](https://github.com/Raphaelmbewe/alx-pre_course/assets/66825194/9211606d-c137-483a-80fb-42f5d80763e7)

### Pages

Pages are specific instances of templates that show what a UI looks like with real representative content in place. We can take the homepage template and pour representative text, images, and media into the template to show real content in action. The page stage is the most concrete stage of atomic design, and it's important for some rather obvious reasons. After all, this is what users will see and interact with when they visit our experience. This is where we see all those components coming together to form a beautiful and functional user interface.<br/><br/>In addition to demonstrating the final interface as our users will see it, pages are essential for testing the effectiveness of the underlying design system. It is at the page stage that we're able to take a look at how all those patterns hold up when real content is applied to the design system. Does everything look great and function as it should? If the answer is NO, ${\color{red} then\ we\  can\ loop\ back\  and\ modify\  our\  molecules,\  organisms,\ and\ templates\  to\  better\  address\  our\  content's\  needs.}$

![page](https://github.com/Raphaelmbewe/alx-pre_course/assets/66825194/b9b37f8e-75b9-47c0-9912-1f4ebfb5f829)

${\color{purple}The\ page\ stage\ replaces\ placeholder\ content\ with\ real\ representative\ content\ to\ bring\ the\ design\ system\ to\ life.}$

**References:**

- [Brad Frost: Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/#:~:text=Atomic%20design%20is%20atoms%2C%20molecules,parts%20at%20the%20same%20time.)
- [Toptal: Atomic Design And Sketch: A Guide To Improving Workflow](https://www.toptal.com/designers/ui/atomic-design-sketch)

---

> Running the Server:

- Clone the Repo
- cd into SparkHub-frontend
- Run the command `yarn` to install all the packages
- Run the command `yarn dev` to start the server
