import Title from "../components/Title";

function About(){
    let storedMode = localStorage.getItem('mode')
    let darkMode = storedMode==='dark'?'text-info':''
    return (
      <div className={darkMode + ' text-center m-5 p-4'}>
        <Title text="Welcome to Business Zone!" />
        <h3>About Us</h3>
        <p>
          Business Zone is a cutting-edge online platform designed to
          revolutionize the way business users share their professional
          information. We provide a seamless and efficient solution for
          businesses to digitally publish and distribute their business cards.
          Our platform enables users to create stunning digital business cards
          and effortlessly share them with clients, prospects, and colleagues,
          making networking easier and more impactful.
        </p>
        <h3>Our Mission</h3>
        <p>
          At Business Zone, our mission is to empower businesses to leave a
          lasting impression by transforming the traditional business card into
          a dynamic and interactive digital experience. We believe that
          networking should be convenient, environmentally friendly, and
          adaptable to the digital age. Our goal is to provide businesses with
          an innovative platform that enhances their professional image and
          facilitates meaningful connections.
        </p>
        <h3>How It Works</h3>
        <p>
          Create Digital Business Cards: Our intuitive creation tool lets you
          create a beautifully designed business card by providing information
          through our form.
        </p>
        <h3>Real-Time Updates</h3>
        <p>
          Keep your contacts up to date with ease. When you update your
          information on Business Zone, your digital business card automatically
          syncs in real time, ensuring that recipients always have the most
          accurate and current version. No more wasted cards or outdated
          information—it's all easily manageable through our platform.
        </p>
        <h3 className="mt-5 mb-4">Why Choose Business Zone?</h3>
        <h4>Enhanced Professional Image:</h4>
        <p>
          Stand out from the crowd with a digital business card that reflects
          your professionalism and innovation. Impress clients, prospects, and
          colleagues with a dynamic and interactive representation of your
          brand. Show that you're technologically savvy, environmentally
          conscious, and always ahead of the curve.
        </p>
        <h4>Convenience and Efficiency:</h4>
        <p>
          Simplify your networking process and eliminate the need for physical
          cards. With Business Zone, your digital business card is always
          accessible on your smartphone or any connected device. Effortlessly
          manage and update your information as needed.
        </p>
        <h4>Join Business Zone Today</h4>
        <p>
          Discover the future of networking with Business Zone. Create stunning
          digital business cards. Start leveraging the power of digital
          technology to enhance your professional image and take your networking
          to new heights. Join Business Zone today.
        </p>
      </div>
    );
}

export default About
