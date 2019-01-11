## React Coding Challenge

This code challenge tests your skills in react js, testing and modular design. The purpose of the application is to correctly render a stream of messages coming from an api. Different messages will be coded different colors and require slightly different rendering. The rules are described in detail below.

This challenge already includes an API response. It is not required or expected for you to make any changes to this interaction. The 3 priorities that we provide you are:
  * 1 = error
  * 2 = warning
  * 3 = info

### Acceptance Criteria

1. Messages should be rendered in a grid-like structure determined by you. The newest messages should appear at the top of the grid.
2. The messages should be color coded depending on the priority of the message. The appropriate color per priority is:
   * error: #F56236
   * warning: #FCE788
   * info: #88FCA3
3. Each time a message with the priority level of error is received, a snackbar containing the error message should also appear at the top of the application. The error should disappear in 2 seconds or when another error message takes its place.
4. A user should be able to clear the grid of all messages at any point.
5. A user should be able to start and stop incoming messages. By default the messages should be running and displaying on the grid.
6. Use material-ui components and JSS styles.
7. Test your application to the degree that you feel comfortable with. No specific testing frameworks are required.
