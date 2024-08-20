import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      This is a demo site for PortfolioApp!
      <br />
      here are a few things to try on this site, at least with the functionality
      I have built thus far:
      <br />
      <ul>
        <li>go to the users page</li>
        <li>follow a user</li>
        <li>like a post</li>
        <li>play an audio</li>
        <li>enjoy the sick tune I made with my friends in high-school</li>
        <li>enjoy the nice responsive design (on the users page)</li>
        <li>
          mess around with the audio player, both in mobile and desktop form
        </li>
        <li>try dark/light mode</li>
        <li>
          have a look at the auth page, and it's nice transitions (from login to
          signup and back)
        </li>
        <li>have a look at the ssr pagination of the user posts tabs</li>
        <li>
          view the repo at{" "}
          <a
            href="https://github.com/haraldev01/portfolio_app_1"
            target="_blank"
          >
            https://github.com/haraldev01/portfolio_app_1
          </a>
        </li>
      </ul>
      <Link
        href={"/users/testuser"}
        className="underline underline-offset-2 text-primary md:hover:text-primary/70"
      >
        go to testuser user page.
      </Link>
      <div>
        it should be noted that this site is an anonymized and outdated version
        of a real site I am developing. Any weird behaviour like displayed
        information being inconsistent, like for example user posts somehow
        having an author that is not the same user, that is all caused by the
        fact that all information on the page is mocked. Still, enjoy this
        snapshot of my project.
      </div>
    </div>
  );
}
