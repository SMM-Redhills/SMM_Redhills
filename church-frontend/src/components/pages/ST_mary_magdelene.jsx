import React from 'react';
import { Cross, Heart, Book, Star, MapPin, Crown, Flower } from 'lucide-react';
import { assignedColors } from '../../utils/sectionColors';

const STMaryMagdelene = () => {
  return (
    <>
      <style>
        {`
          .container {
            min-height: 100vh;
            background-color: #ffffff;
            width: 100%;
          }
          
          .hero-section {
            position: relative;
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
            color: white;
            padding: 4rem 1rem;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          
          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255,255,255,0.1);
          }
          
          .hero-content {
            position: relative;
            max-width: 72rem;
            margin: 0 auto;
            text-align: center;
          }
          
          .hero-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            line-height: 1.1;
            text-align: center;
            font-family: serif;
          }
          
          .hero-subtitle {
            display: block;
            font-size: 1.5rem;
            font-weight: 300;
            margin-top: 0.5rem;
            color: #e0f2fe;
          }
          
          .hero-description {
            font-size: 1.125rem;
            margin-bottom: 2rem;
            max-width: 48rem;
            margin: 0 auto 2rem auto;
            line-height: 1.7;
            text-align: center;
            color: #e0f2fe;
          }
          
          .main-content {
            width: 100%;
            padding: 4rem 1rem;
            background-color: #f8fafc;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .content-wrapper {
            max-width: 80rem;
            width: 100%;
            margin: 0 auto;
          }
          
          .section {
            margin-bottom: 4rem;
            padding: 3rem 2rem;
            border-radius: 1rem;
          }
          
          .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
            text-align: center;
            font-family: serif;
          }
          
          .section-subtitle {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 2rem;
            text-align: center;
            font-family: serif;
          }
          
          .section-text {
            font-size: 1.125rem;
            line-height: 1.7;
            text-align: center;
            max-width: 60rem;
            margin: 0 auto 1.5rem auto;
          }
          
          .quote-box {
            padding: 1.5rem;
            border-radius: 0.75rem;
            margin: 1.5rem auto;
            max-width: 50rem;
          }
          
          .quote-text {
            font-size: 1rem;
            font-style: italic;
            text-align: center;
            margin: 0;
          }
          
          .image-container {
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .section-image {
            max-width: 400px;
            width: 100%;
            border-radius: 1rem;
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          }
          
          .large-image {
            max-width: 500px;
          }
          
          .xlarge-image {
            max-width: 600px;
          }
          
          .image-caption {
            font-size: 0.875rem;
            color: #64748b;
            margin-top: 0.5rem;
            font-style: italic;
          }
          
          .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          }
          
          .two-column-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
          }
          
          .three-column-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
          }
          
          .card {
            padding: 2rem;
            border-radius: 1rem;
          }
          
          .card-title {
            font-weight: 600;
            margin-bottom: 1rem;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .card-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .card-list-item {
            margin-bottom: 0.5rem;
          }
          
          .icon-title {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .prayer-section {
            padding: 3rem 2rem;
            border-radius: 1rem;
            border: 1px solid #0ea5e9;
            text-align: center;
          }
          
          .prayer-icon {
            display: flex;
            justify-content: center;
            margin-bottom: 1.5rem;
          }
          
          .prayer-title {
            font-weight: 600;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            font-family: serif;
          }
          
          .prayer-text {
            font-size: 1.125rem;
            font-style: italic;
            line-height: 1.7;
            max-width: 50rem;
            margin: 0 auto;
          }
          
          /* Section-specific styles */
          .who-section {
            background-color: ${assignedColors.church};
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          }
          
          .who-section .section-title {
            color: #0284c7;
          }
          
          .who-section .section-text {
            color: #64748b;
          }
          
          .demons-section {
            background-color: ${assignedColors.quickLinks};
          }
          
          .demons-section .section-subtitle {
            color: #d97706;
          }
          
          .demons-section .section-text {
            color: #92400e;
          }
          
          .demons-section .quote-box {
            background-color: #fbbf24;
          }
          
          .demons-section .quote-text {
            color: #92400e;
          }
          
          .facts-section {
            background-color: ${assignedColors.history};
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          }
          
          .facts-section .section-subtitle {
            color: #0284c7;
          }
          
          .facts-section .card {
            background-color: #e0f2fe;
            border: 1px solid #0ea5e9;
          }
          
          .facts-section .card-title {
            color: #0284c7;
          }
          
          .facts-section .card-list-item {
            color: #0369a1;
          }
          
          .resurrection-section {
            background-color: ${assignedColors.schedule};
          }
          
          .resurrection-section .section-subtitle {
            color: #0284c7;
          }
          
          .resurrection-section .section-text {
            color: #0369a1;
          }
          
          .resurrection-section .quote-box {
            background-color: #dbeafe;
          }
          
          .resurrection-section .quote-text {
            color: #1e40af;
          }
          
          .life-section {
            background-color: ${assignedColors.aboutSaint};
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          }
          
          .life-section .section-subtitle {
            color: #0284c7;
          }
          
          .life-section .catholic-card {
            background-color: #cefec7ff;
            border: 1px solid #0bf5e5ff;
          }
          
          .life-section .catholic-card h4 {
            color: #06d91bff;
          }
          
          .life-section .catholic-card p {
            color: #41920eff;
          }
          
          .life-section .provence-card {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
          }
          
          .life-section .provence-card h4 {
            color: #d97706;
          }
          
          .life-section .provence-card p {
            color: #92400e;
          }
          
          .art-section {
            background-color: ${assignedColors.gallery};
          }
          
          .art-section .section-subtitle {
            color: #be185d;
          }
          
          .art-section .section-text {
            color: #be185d;
          }
          
          .art-section .card {
            background-color: #fce7f3;
            border: 1px solid #ec4899;
          }
          
          .art-section .card-title {
            color: #be185d;
          }
          
          .art-section .card-list-item {
            color: #9d174d;
          }
          
          .miracles-section {
            background-color: ${assignedColors.news};
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          }
          
          .miracles-section .section-subtitle {
            color: #0284c7;
          }
          
          .miracles-section .section-text {
            color: #64748b;
          }
          
          .miracles-section .info-box {
            background-color: #f0f9ff;
          }
          
          .miracles-section .info-box h4 {
            color: #0284c7;
          }
          
          .miracles-section .info-box p {
            color: #0369a1;
          }
          
          .legacy-section {
            background-color: ${assignedColors.events};
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          }
          
          .legacy-section .section-subtitle {
            color: #0284c7;
          }
          
          .legacy-section .section-text {
            color: #64748b;
          }
          
          .legacy-section .facts-box {
            background-color: #fffbeb;
          }
          
          .legacy-section .facts-box h4 {
            color: #d97706;
          }
          
          .legacy-section .facts-box .card-list-item {
            color: #92400e;
          }
          
          .prayer-section {
            background-color: ${assignedColors.prayers};
          }
          
          .prayer-section .prayer-title {
            color: #0284c7;
          }
          
          .prayer-section .prayer-text {
            color: #0369a1;
          }
        `}
      </style>
      
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              Saint Mary Magdalene
              <span className="hero-subtitle">The Apostle to the Apostles</span>
            </h1>
            <p className="hero-description">
              First witness to Christ's resurrection and symbol of redemption and unwavering faith
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-wrapper">
          
            {/* Who Was Mary Magdalene Section */}
            <section className="section who-section">
              <h2 className="section-title">Who Was Mary Magdalene?</h2>
              
              {/* Classical Art Image */}
              <div className="image-container">
                <img 
                  src="/assets/images/SMMI (1).png"
                  alt="The Penitent Magdalene by Guido Reni"
                  className="section-image"
                />
              </div>

              <p className="section-text">
                Saint Mary Magdalene was one of Jesus Christ's most devoted followers and is considered 
                the "Apostle to the Apostles." She played a crucial role in the early Christian church 
                and was the first person to witness the resurrection of Jesus. Jesus healed her from seven demons, 
                transforming her life completely and making her one of his most faithful disciples.
              </p>
            </section>

            {/* The Seven Demons and Healing Section */}
            <section className="section demons-section">
              <h3 className="section-subtitle">The Seven Demons and Divine Healing</h3>
              <p className="section-text">
                According to the Gospel of Luke, Jesus exorcised "seven demons" from Mary Magdalene. 
                In Jewish tradition, seven represented completeness, meaning she was completely overwhelmed 
                by spiritual torment - whether physical, psychological, or emotional ailments. This miraculous 
                healing transformed her life entirely, leading to her complete devotion to Christ and his mission.
              </p>
              <div className="quote-box">
                <p className="quote-text">
                  "And also some women who had been healed of evil spirits and infirmities: 
                  Mary, called Magdalene, from whom seven demons had gone out" - Luke 8:2
                </p>
              </div>
            </section>

            {/* Key Facts Section - Enhanced */}
            <section className="section facts-section">
              <h3 className="section-subtitle">Key Facts About Saint Mary Magdalene</h3>
              <div className="grid-container">
                <div className="card">
                  <h4 className="card-title">
                    <Star />
                    Biblical Significance
                  </h4>
                  <ul className="card-list">
                    <li className="card-list-item">• First witness to Jesus' resurrection</li>
                    <li className="card-list-item">• Present at the crucifixion and burial</li>
                    <li className="card-list-item">• Healed from seven demons by Jesus</li>
                    <li className="card-list-item">• Mentioned 12 times in the Gospels</li>
                    <li className="card-list-item">• One of the women who supported Jesus financially</li>
                    <li className="card-list-item">• Followed Jesus throughout his ministry</li>
                  </ul>
                </div>
                
                <div className="card">
                  <h4 className="card-title">
                    <Book />
                    Historical Details
                  </h4>
                  <ul className="card-list">
                    <li className="card-list-item">• From Magdala, a fishing town on Sea of Galilee</li>
                    <li className="card-list-item">• Feast day: July 22</li>
                    <li className="card-list-item">• Patron saint of penitents and contemplatives</li>
                    <li className="card-list-item">• Symbol: Jar of ointment/perfume</li>
                    <li className="card-list-item">• Name means "Tower" in Hebrew (magdal)</li>
                    <li className="card-list-item">• Known as "Evangelist" and bearer of Good News</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Noli Me Tangere Image */}
            <section style={{marginBottom: '4rem', textAlign: 'center'}}>
              <img 
                src="/assets/images/JR.jpeg"
                alt="Saint Mary Magdalene"
                className="section-image large-image"
              />
              <p className="image-caption">
                "Noli Me Tangere" by Giotto (c. 1305) - The moment Jesus appeared to Mary Magdalene after resurrection
              </p>
            </section>

            {/* The Resurrection Witness Section */}
            <section className="section resurrection-section">
              <h3 className="section-subtitle">The Resurrection Witness</h3>
              <p className="section-text">
                According to the Gospels, Mary Magdalene was the first person to see Jesus after his 
                resurrection. She went to the tomb early on Easter morning and found it empty. When 
                Jesus appeared to her, he commissioned her to tell the other disciples about his 
                resurrection, earning her the title "Apostle to the Apostles." This scene is famously 
                depicted in art as "Noli Me Tangere" (Touch Me Not).
              </p>
              <div className="quote-box">
                <p className="quote-text">
                  "Go to my brothers and tell them, 'I am ascending to my Father and your Father, 
                  to my God and your God.'" - John 20:17
                </p>
              </div>
            </section>

            {/* Life in Provence Legend */}
            <section className="section life-section">
              <h3 className="section-subtitle icon-title">
                <MapPin />
                Life After the Resurrection
              </h3>
              
              <div className="two-column-grid">
                <div className="card catholic-card">
                    <h4>Catholic Tradition</h4>
                    <p>
                      According to Catholic tradition, Mary Magdalene traveled to southern France 
                      with Lazarus, Martha, and other disciples after persecution in Jerusalem. She 
                      helped evangelize the region of Provence, converting the entire area to Christianity. 
                      After her missionary work, she spent the final 30 years of her life as a penitent 
                      hermit in the cave of La Sainte-Baume in the French countryside. She died there 
                      and was buried by Saint Maximinus in what is now the   of Saint Mary 
                      Magdalene at Saint-Maximin-la-Sainte-Baume, where her relics are venerated today.
                    </p>
                  </div>

                
                <div className="card provence-card">
                  <h4>French Provence Legend</h4>
                  <p>
                    French legend tells that Mary Magdalene, along with Lazarus, Martha, and other disciples, 
                    sailed to Marseille in southern France after persecution in Jerusalem. She helped convert 
                    the people of Marseille to Christianity, then spent 30 years in penance at 
                    La Sainte-Baume (holy cave) and converted the entire region of Provence.
                  </p>
                </div>
              </div>

              {/* La Sainte-Baume Image */}
              <div className="image-container" style={{marginTop: '2rem'}}>
                <img 
                  src="/assets/images/ALTER.jpg" 
                  alt="La Sainte-Baume cave in Provence, France"
                  className="section-image xlarge-image"
                />
                <p className="image-caption">
                  La Sainte-Baume cave in Provence, France - where Mary Magdalene allegedly spent 30 years in hermitage
                </p>
              </div>
            </section>

            {/* Artistic Representations Section */}
            <section className="section art-section">
              <h3 className="section-subtitle icon-title">
                <Crown />
                Artistic Representations and Symbols
              </h3>
              
              <p className="section-text">
                Mary Magdalene has been a central figure in Christian art throughout history. She is 
                typically depicted with long flowing hair, often wearing red garments, and carrying 
                a jar of ointment or perfume. Famous artists like Giotto, Duccio, and Tilman 
                Riemenschneider have created masterpieces showing her spiritual journey.
              </p>

              <div className="three-column-grid">
                <div className="card">
                  <h4>Primary Symbols</h4>
                  <ul className="card-list">
                    <li className="card-list-item">• Jar of ointment/perfume</li>
                    <li className="card-list-item">• Long flowing hair</li>
                    <li className="card-list-item">• Red garments</li>
                    <li className="card-list-item">• Tears of repentance</li>
                  </ul>
                </div>
                
                <div className="card">
                  <h4>Famous Depictions</h4>
                  <ul className="card-list">
                    <li className="card-list-item">• "Noli Me Tangere" scenes</li>
                    <li className="card-list-item">• At the Crucifixion</li>
                    <li className="card-list-item">• Penitent in the wilderness</li>
                    <li className="card-list-item">• As preacher and evangelist</li>
                  </ul>
                </div>
                
                <div className="card">
                  <h4>Patron Saint Of</h4>
                  <ul className="card-list">
                    <li className="card-list-item">• Repentant sinners</li>
                    <li className="card-list-item">• Contemplatives</li>
                    <li className="card-list-item">• Hairdressers</li>
                    <li className="card-list-item">• Perfumers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Miraculous Stories Section */}
            <section className="section miracles-section">
              <h3 className="section-subtitle">Miraculous Stories and Legends</h3>
              <p className="section-text">
                According to "The Golden Legend" by Jacobus de Voragine, Mary Magdalene performed 
                several miracles during her ministry in France, including making a governor's 
                barren wife pregnant through prayer and protecting a mother and child on a 
                deserted island for two years through divine intervention.
              </p>
              
              <div className="info-box">
                <h4>The Red Egg Legend</h4>
                <p>
                  Eastern tradition tells that Mary Magdalene went to Rome to proclaim the resurrection to Emperor Tiberius. 
                  When she declared "Christ is Risen," the emperor mocked her, saying a man could no more rise from the 
                  dead than the egg in her hand could turn red. Instantly, the egg turned bright red, symbolizing the 
                  blood of Christ and the truth of the resurrection.
                </p>
              </div>
            </section>

            {/* Legacy Section */}
            <section className="section legacy-section">
              <h3 className="section-subtitle">Legacy and Veneration</h3>
              <p className="section-text">
                Mary Magdalene has been venerated as a saint since the early Christian church. She 
                represents the model of repentance, devotion, and evangelization. Many churches and 
                religious communities worldwide are dedicated to her memory. During the Counter-Reformation, 
                the Catholic Church particularly emphasized her as a symbol of penance and transformation.
              </p>

              <div className="facts-box">
                <h4 className="card-title">
                  <Flower />
                  Fun Facts
                </h4>
                <ul className="card-list">
                  <li className="card-list-item">• She is mentioned more frequently in the Gospels than most apostles</li>
                  <li className="card-list-item">• Her feast day was elevated to the rank of apostle by Pope Francis in 2016</li>
                  <li className="card-list-item">• The famous "Noli Me Tangere" scene has been painted by countless artists</li>
                  <li className="card-list-item">• She is the patron saint of hairdressers, perfumers, and repentant women</li>
                  <li className="card-list-item">• The   of Saint-Maximin houses what are claimed to be her relics</li>
                  <li className="card-list-item">• Her name "Magdalene" means "tower" in Hebrew</li>
                </ul>
              </div>
            </section>

            {/* Prayer Section */}
            <section className="prayer-section">
              <div className="prayer-icon">
                <Heart style={{width: '2rem', height: '2rem', color: '#0284c7'}} />
              </div>
              <h4 className="prayer-title">Prayer to Saint Mary Magdalene</h4>
              <p className="prayer-text">
                "Saint Mary Magdalene, you were blessed to be the first witness of Christ's 
                resurrection. Help us to recognize Jesus in our daily lives and to share the 
                good news of his love with others. Through your intercession, may we find 
                healing from our spiritual wounds and strength to follow Christ faithfully. 
                Like you, may we experience the transforming power of God's love and mercy. Amen."
              </p>
            </section>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default STMaryMagdelene;