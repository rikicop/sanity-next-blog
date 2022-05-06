/* 
Fetch the author data from the API

.fetch(
        `*[_type == "post" && _id == '2a414786-baab-4447-ae37-fb87dea22fec']{
      'author': *[_type == "author" && _id == ^.author._ref]{{name, 'picture': image.asset->url}}
}`, */

/* *[_type == "post" && _id == 'fb9aadfc-548b-4272-96de-66bae10d2182']{
      'author': *[_type == "author" && _id == ^.author._ref]{{name, 'picture': image.asset->url}}
} */

/* Delete */
{
  "mutations": [
    {
      "delete": {
        "query": "*[_type == 'author' && _id == 'drafts.5e2759b5-bd79-48ff-9406-c57c3e98126a']",
      }
    }
  ]
}