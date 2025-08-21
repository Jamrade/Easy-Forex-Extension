# Learning Experiences

This is a place for me to document all of the challenges of the project

## Problem 1: Transfering states between pages

### Description of the Issue

Once the login is successful from the login page, a session token is provided. This session token is used for all account based queries and trades made. In an effort to not have to load the credentials document everytime a page is loaded or every 20 minutes (When the session token expires automatically) I wanted to store the session token in a binding to be shared across HTML pages.

My Initial thought process was to have files individual to the pages and then have a shared javascript file where, much like a class would, getter and setter methods for global bindings would be interfaced with between pages. This did not work however because everytime a new page loaded this "general" javascript interface it would reset the values of the bindings.

### Solution

Using cookies I was able to save the session ID, Username, and account ID to the client so they could be shared across pages.

## Problem 2

### Description of the Issue

Page will refresh repeatedly on occassion after subscribing to a currency.

### Solution

Save the session token for all connections made to lightstreamer (Both market and account stats sessions) and using the "onbeforeunload" loop through all session tokens stored and remove the session
