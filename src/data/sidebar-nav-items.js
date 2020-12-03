export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Users",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/users",
    },
    {
      title: "Reports",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/reports",
    },
    {
      title: "Location",
      htmlBefore: '<i class="material-icons">location_on</i>',
      to: "/locations",
    }
  ];
}
