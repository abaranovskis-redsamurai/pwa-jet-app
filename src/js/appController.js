/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojarraydataprovider', 'text!../js/resources/singleItemData.json', 
        'knockout', 'ojs/ojknockout', 'ojs/ojchart', 'ojs/ojbutton'],
  function(ResponsiveUtils, ResponsiveKnockoutUtils, ArrayDataProvider, data, ko) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("Progressive Web App in Oracle JET");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      self.innerRadius = ko.observable(0.5);
      self.centerLabel = ko.observable('Center Label');
      self.labelStyle = ko.observable({fontSize:'20px',color:'#999999'});

      self.jsonConverter = {format: function(value) {return JSON.stringify(value);},
                            parse: function(value) {return JSON.parse(value);}};
      
      /* chart data */
      var chartData = ko.observableArray(JSON.parse(data));
      self.dataProvider = new ArrayDataProvider(chartData, {keyAttributes: 'id'});

      self.getLocation = function(event) {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          alert("Geo Location not supported by browser");
        }
      }

      self.latitude = ko.observable();
      self.longitude = ko.observable();
      function showPosition(position) {
        self.latitude(position.coords.latitude);
        self.longitude(position.coords.longitude);
      }

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
     }

     return new ControllerViewModel();
  }
);
