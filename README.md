Overview
-----------------
This page provides an overview of all the features of this website and how they work in technical detail and in general.

The home page is for general access and use by the teachers and whoever else needs to access attendance info. It includes no capability to modify, add, or remove any attendance data and is not password locked but is only accessible through MVS Secure.

The admin page is only for the secretary and authorized users who need to change attendance data. Getting to this page requires you to go through a login page first. Here, you can add and resolve current absences to be displayed on the home page in addition to planned absences. First you select the type of attendance entry you would like to submit, choose the student's grade level, the student, then the absence reason, and finally any additional parameters specific to the entry you are making.

Home Page
--------------------
* Displays current absences, fetched with query.php #7
* Displays expected/planned absences with query.php #6
* Displays current attendance percentage rounded to 2 decimal places by comparing query.php #8 to query.php #9

Login Page
--------------------
* Includes username and password for mvsadmin
* Uses loginVerify.php to verify credentials by returning the entered data if it matches the database

Admin Page
----------------------
* Clear absences button to clear current abscenes using DANGER.php
* **New entry section**
	* All sections
		* Absence reason loaded by query.php #3
		* Adds to attendance_history with newEntry.php with corresponding attendance type
	* Early departures fields
		* Graduation year to filter student selection using query.php #1
		* Student list filtered by graduation year using query.php #2
	* Late arrival fields
		* Currently absent students using query.php #4
	* Absent student fields
		* Graduation year to filter student selection using query.php #1
		* Student list filtered by graduation year using query.php #2
* **New planned absence section**
	* All sections
		* Graduation year to filter student selection using query.php #1
		* Student list filtered by graduation year using query.php #2
		* Absence reason loaded by query.php #3
		* Date field html form element
		* Adds to absence_plan using newPlan.php and corresponding plan type
	* All day absence fields
		* Includes only the above listed parameters
	* Leaving early/Arriving late
		* Time field html form element

Navigation Bar (All pages)
----------------------------------------------
* Home page link
* Admin Page link
* Displays current page
* Absence percent
