PROJECT LOGOS: drop your image files in this folder.

1. Save a square image here, for example "dicet.png".
   PNG, JPG and SVG all work. 256x256 is plenty.
2. Open lib/data.ts and add the logo line to that project:
       logo: "/logos/dicet.png",
   The path always starts with "/logos/" and the /public part is automatic.
3. Save. The project card shows your logo. If a project has no logo,
   the card shows its initials on a red tile so nothing looks broken.

Tip: keep logos under about 100 KB so the page stays fast on phones.
