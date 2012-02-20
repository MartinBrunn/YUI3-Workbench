var land =
{
	BW : "Baden-W&uuml;rtemberg",
	BY : "Bayern",
	NW : "Nordrhein-Westfalen",
	RP : "Rheinlandpfalz",
	SL : "Saarland",
	BB : "Brandenburg",
	MV : "Mecklenburg-Vorpommern",
	SN : "Sachsen",
	ST : "ST", 
	SH : "Schleswig-Holstein",
	TH : "Th&uuml;ringen",
	HE : "Hessen",
	NS : "Niedersachsen",
	SA : "Sachsen-Anhalt"
} ;

var local_type =
{
	"BUND" : "Bundeseinheitlich",
	"STILL" : "stille Tage",
	"SONST" : "",
	"G2" : "BW, BY, NW, RP, SL",
	G3 : "BB, MV, SN, ST, TH",
	G4 : "BY, SL",
	G5 : "BW, BY, ST",
	G7 : "BW ??" ,
	G8 : "BW, BY, HE, NW, RP, SL",
	G9 : ""
} ;

var LangDep =
{
	"NEUJAHR" :						"Neujahr" ,						
	"EPIPHANIE" :                   "Epiphanie" ,
	"MAIFEIERTAG" :                 "Maifeiertag" ,
	"MARIA HIMMELFAHRT" :           "Maria Himmelfahrt" ,
	"TAG DER DEUTSCHEN EINHEIT" :   "Tag der Deutschen Einheit" ,
	"REFORMATIONSTAG" :             "Reformationstag" ,
	"ALLERHEILIGEN" :               "Allerheiligen" ,
	"HEILIG ABEND" :                "Heilig Abend" ,
	"1.WEIHNACHTSFEIERTAG" :        "1.Weihnachtsfeiertag" ,
	"2.WEIHNACHTSFEIERTAG" :        "2.Weihnachtsfeiertag" ,
	"SYLVESTER" :                   "Sylvester" ,
	
	"ASCHERMITTWOCH" :              "Aschermittwoch" ,
	"GRUENDONNERSTAG" :		        "Gr&uuml;ndonnerstag" ,
	"KARFREITAG" :                  "Karfreitag" ,
	"OSTERSONNTAG" :                "Ostersonntag" ,
	"OSTERMONTAG" :                 "Ostermontag" ,
	"CHRISTI HIMMELFAHRT" :         "Christi Himmelfahrt" ,
	"PFINGSTSONNTAG" :              "Pfingstsonntag" ,
	"PFINGSTMONTAG" :               "Pfingstmontag" ,
	"FRONLEICHNAM" :				"Fronleichnam" ,					

	"FASCHING" :  					"Fasching" ,
	"ROSENMONTAG" : 				"Rosenmontag",
	"FASCHINGSDIENSTAG" : 			"Faschingsdienstag",
	                             
	"BUSSUNDBETTAG" :				"Buss und Bettag",
	"MUTTERTAG" :					"Muttertag"
} ;
var feast_german =
{
	fixed :
	{
		"NEUJAHR" : [ 1 , 1  , "BUND" ],
		"EPIPHANIE" : [ 6 , 1 , "G5" ] ,
		"MAIFEIERTAG" : [ 1, 5  , "BUND" ] ,
		"MARIA HIMMELFAHRT" : [ 15 , 8 , "G4" ] ,
		"TAG DER DEUTSCHEN EINHEIT" : [ 3, 10 , "BUND" ] ,
		"REFORMATIONSTAG" : [ 31, 10 , "G3" ] ,
		"ALLERHEILIGEN" : [ 1, 11 , "G2" ] ,
		"HEILIG ABEND" : [ 24 , 12 , "STILL" ] ,
		"1.WEIHNACHTSFEIERTAG" : [ 25 , 12 , "BUND" ] ,
		"2.WEIHNACHTSFEIERTAG" : [ 26 , 12 , "BUND" ] ,
		"SYLVESTER" : [ 31, 12 , "SONST" ]
		
	} ,
	variable :
	{
		"FASCHING" : [ "FASCHING" ,  0 , "SONST" ]  ,
		"ROSENMONTAG" : [ "FASCHING" ,  1 , "SONST" ]  ,
		"FASCHINGSDIENSTAG" : [ "FASCHING" ,  2 , "SONST" ]  ,
		"ASCHERMITTWOCH" : [ "FASCHING" ,  3 , "STILL" ]  ,
		"GRUENDONNERSTAG" : [ "EASTER" ,  -3 , "G7" ] ,
		"KARFREITAG" : [ "EASTER" ,  -2 , "BUND" ] ,
		"OSTERSONNTAG" : [ "EASTER" ,  0 , "BUND" ],
		"OSTERMONTAG" : [ "EASTER" ,  1 , "BUND" ] ,
		"CHRISTI HIMMELFAHRT" : [ "EASTER" ,  39 , "BUND" ] ,
		"PFINGSTSONNTAG" : [ "EASTER" ,  49 , "BUND" ] ,
		"PFINGSTMONTAG" : [ "EASTER" ,  50 , "BUND" ] ,
		"FRONLEICHNAM" : [ "EASTER" ,  60 , "G8" ] ,
		"BUSSUNDBETTAG" : [ "BUSSUNDBET" ,  60 , "G10" ] ,
		"MUTTERTAG" : [ "MUTTERTAG" ,  60 , "SONST" ] 
		
	}
} ;
