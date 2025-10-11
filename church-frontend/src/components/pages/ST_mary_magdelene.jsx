import React from 'react';
import { Cross, Heart, Book, Star, MapPin, Crown, Flower } from 'lucide-react';

const STMaryMagdelene = () => {
  return (
    <div style={{minHeight: '100vh', backgroundColor: '#ffffff', width: '100%'}}>
      {/* Hero Section */}
      <section style={{position: 'relative', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', color: 'white', padding: '4rem 1rem', width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        <div style={{position: 'relative', maxWidth: '72rem', margin: '0 auto', textAlign: 'center'}}>
          {/* <div style={{marginBottom: '2rem'}}>
            <Cross style={{width: '3rem', height: '3rem', margin: '0 auto 1rem auto', color: '#ffffff', display: 'block'}} />
          </div> */}
          <h1 style={{fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.1', textAlign: 'center', fontFamily: 'serif'}}>
            Saint Mary Magdalene
            <span style={{display: 'block', fontSize: '1.5rem', fontWeight: '300', marginTop: '0.5rem', color: '#e0f2fe'}}>The Apostle to the Apostles</span>
          </h1>
          <p style={{fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto 2rem auto', lineHeight: '1.7', textAlign: 'center', color: '#e0f2fe'}}>
            First witness to Christ's resurrection and symbol of redemption and unwavering faith
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{width: '100%', padding: '4rem 1rem', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{maxWidth: '80rem', width: '100%', margin: '0 auto'}}>
        
          {/* Who Was Mary Magdalene Section */}
          <section style={{marginBottom: '4rem', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h2 style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', textAlign: 'center', fontFamily: 'serif'}}>Who Was Mary Magdalene?</h2>
            
            {/* Classical Art Image */}
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
              <img 
                src="/assets/images/SMMI (1).png"
                alt="The Penitent Magdalene by Guido Reni"
                style={{maxWidth: '400px', width: '100%', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}
              />
              {/* <p style={{fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic'}}>
                The Penitent Magdalene by Guido Reni (1575-1642)
              </p> */}
            </div>


            <p style={{color: '#64748b', marginBottom: '2rem', fontSize: '1.125rem', lineHeight: '1.7', textAlign: 'center', maxWidth: '60rem', margin: '0 auto 2rem auto'}}>
              Saint Mary Magdalene was one of Jesus Christ's most devoted followers and is considered 
              the "Apostle to the Apostles." She played a crucial role in the early Christian church 
              and was the first person to witness the resurrection of Jesus. Jesus healed her from seven demons, 
              transforming her life completely and making her one of his most faithful disciples.
            </p>
          </section>

          {/* The Seven Demons and Healing Section */}
          <section style={{marginBottom: '4rem', background: 'linear-gradient(to right, #fef3c7, #fde68a)', padding: '3rem 2rem', borderRadius: '1rem'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', color: '#d97706', marginBottom: '2rem', textAlign: 'center', fontFamily: 'serif'}}>The Seven Demons and Divine Healing</h3>
            <p style={{color: '#92400e', fontSize: '1.125rem', lineHeight: '1.7', textAlign: 'center', maxWidth: '60rem', margin: '0 auto 1.5rem auto'}}>
              According to the Gospel of Luke, Jesus exorcised "seven demons" from Mary Magdalene. 
              In Jewish tradition, seven represented completeness, meaning she was completely overwhelmed 
              by spiritual torment - whether physical, psychological, or emotional ailments. This miraculous 
              healing transformed her life entirely, leading to her complete devotion to Christ and his mission.
            </p>
            <div style={{backgroundColor: '#fbbf24', padding: '1.5rem', borderRadius: '0.75rem', margin: '1.5rem auto', maxWidth: '50rem'}}>
              <p style={{color: '#92400e', fontSize: '1rem', fontStyle: 'italic', textAlign: 'center', margin: 0}}>
                "And also some women who had been healed of evil spirits and infirmities: 
                Mary, called Magdalene, from whom seven demons had gone out" - Luke 8:2
              </p>
            </div>
          </section>

          {/* Key Facts Section - Enhanced */}
          <section style={{marginBottom: '4rem', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', textAlign: 'center', fontFamily: 'serif'}}>Key Facts About Saint Mary Magdalene</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
              <div style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9'}}>
                <h4 style={{fontWeight: '600', color: '#0284c7', marginBottom: '1rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <Star style={{width: '1.25rem', height: '1.25rem'}} />
                  Biblical Significance
                </h4>
                <ul style={{color: '#0369a1', fontSize: '1rem', lineHeight: '1.6', listStyle: 'none', padding: 0, margin: 0}}>
                  <li style={{marginBottom: '0.5rem'}}>• First witness to Jesus' resurrection</li>
                  <li style={{marginBottom: '0.5rem'}}>• Present at the crucifixion and burial</li>
                  <li style={{marginBottom: '0.5rem'}}>• Healed from seven demons by Jesus</li>
                  <li style={{marginBottom: '0.5rem'}}>• Mentioned 12 times in the Gospels</li>
                  <li style={{marginBottom: '0.5rem'}}>• One of the women who supported Jesus financially</li>
                  <li style={{marginBottom: '0.5rem'}}>• Followed Jesus throughout his ministry</li>
                </ul>
              </div>
              
              <div style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9'}}>
                <h4 style={{fontWeight: '600', color: '#0284c7', marginBottom: '1rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <Book style={{width: '1.25rem', height: '1.25rem'}} />
                  Historical Details
                </h4>
                <ul style={{color: '#0369a1', fontSize: '1rem', lineHeight: '1.6', listStyle: 'none', padding: 0, margin: 0}}>
                  <li style={{marginBottom: '0.5rem'}}>• From Magdala, a fishing town on Sea of Galilee</li>
                  <li style={{marginBottom: '0.5rem'}}>• Feast day: July 22</li>
                  <li style={{marginBottom: '0.5rem'}}>• Patron saint of penitents and contemplatives</li>
                  <li style={{marginBottom: '0.5rem'}}>• Symbol: Jar of ointment/perfume</li>
                  <li style={{marginBottom: '0.5rem'}}>• Name means "Tower" in Hebrew (magdal)</li>
                  <li style={{marginBottom: '0.5rem'}}>• Known as "Evangelist" and bearer of Good News</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Noli Me Tangere Image */}
          <section style={{marginBottom: '4rem', textAlign: 'center'}}>
            <img 
              src="/assets/images/JR.jpeg"
              alt="Saint Mary Magdalene"
              style={{maxWidth: '500px', width: '100%', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}
            />
            <p style={{fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic'}}>
              "Noli Me Tangere" by Giotto (c. 1305) - The moment Jesus appeared to Mary Magdalene after resurrection
            </p>
          </section>

          {/* The Resurrection Witness Section */}
          <section style={{marginBottom: '4rem', background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)', padding: '3rem 2rem', borderRadius: '1rem'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', textAlign: 'center', fontFamily: 'serif'}}>The Resurrection Witness</h3>
            <p style={{color: '#0369a1', fontSize: '1.125rem', lineHeight: '1.7', textAlign: 'center', maxWidth: '60rem', margin: '0 auto 1.5rem auto'}}>
              According to the Gospels, Mary Magdalene was the first person to see Jesus after his 
              resurrection. She went to the tomb early on Easter morning and found it empty. When 
              Jesus appeared to her, he commissioned her to tell the other disciples about his 
              resurrection, earning her the title "Apostle to the Apostles." This scene is famously 
              depicted in art as "Noli Me Tangere" (Touch Me Not).
            </p>
            <div style={{backgroundColor: '#dbeafe', padding: '1.5rem', borderRadius: '0.75rem', margin: '1.5rem auto', maxWidth: '50rem'}}>
              <p style={{color: '#1e40af', fontSize: '1rem', fontStyle: 'italic', textAlign: 'center', margin: 0}}>
                "Go to my brothers and tell them, 'I am ascending to my Father and your Father, 
                to my God and your God.'" - John 20:17
              </p>
            </div>
          </section>

          {/* Life in Provence Legend */}
          <section style={{marginBottom: '4rem', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', textAlign: 'center', fontFamily: 'serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <MapPin style={{width: '2rem', height: '2rem'}} />
              Life After the Resurrection
            </h3>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '2rem'}}>
              <div style={{backgroundColor: '#cefec7ff', padding: '2rem', borderRadius: '1rem', border: '1px solid #0bf5e5ff'}}>
                  <h4 style={{fontWeight: '600', color: '#06d91bff', marginBottom: '1rem', fontSize: '1.25rem'}}>Catholic Tradition</h4>
                  <p style={{color: '#41920eff', fontSize: '1rem', lineHeight: '1.6'}}>
                    According to Catholic tradition, Mary Magdalene traveled to southern France 
                    with Lazarus, Martha, and other disciples after persecution in Jerusalem. She 
                    helped evangelize the region of Provence, converting the entire area to Christianity. 
                    After her missionary work, she spent the final 30 years of her life as a penitent 
                    hermit in the cave of La Sainte-Baume in the French countryside. She died there 
                    and was buried by Saint Maximinus in what is now the   of Saint Mary 
                    Magdalene at Saint-Maximin-la-Sainte-Baume, where her relics are venerated today.
                  </p>
                </div>

              
              <div style={{backgroundColor: '#fef3c7', padding: '2rem', borderRadius: '1rem', border: '1px solid #f59e0b'}}>
                <h4 style={{fontWeight: '600', color: '#d97706', marginBottom: '1rem', fontSize: '1.25rem'}}>French Provence Legend</h4>
                <p style={{color: '#92400e', fontSize: '1rem', lineHeight: '1.6'}}>
                  French legend tells that Mary Magdalene, along with Lazarus, Martha, and other disciples, 
                  sailed to Marseille in southern France after persecution in Jerusalem. She helped convert 
                  the people of Marseille to Christianity, then spent 30 years in penance at 
                  La Sainte-Baume (holy cave) and converted the entire region of Provence.
                </p>
              </div>
            </div>

            {/* La Sainte-Baume Image */}
            <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <img 
                src="/assets/images/ALTER.jpg" 
                alt="La Sainte-Baume cave in Provence, France"
                style={{maxWidth: '600px', width: '100%', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}
              />
              <p style={{fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic'}}>
                La Sainte-Baume cave in Provence, France - where Mary Magdalene allegedly spent 30 years in hermitage
              </p>
            </div>
          </section>

          {/* Artistic Representations Section */}
          <section style={{marginBottom: '4rem', background: 'linear-gradient(to right, #fdf2f8, #fce7f3)', padding: '3rem 2rem', borderRadius: '1rem'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', color: '#be185d', marginBottom: '2rem', textAlign: 'center', fontFamily: 'serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <Crown style={{width: '2rem', height: '2rem'}} />
              Artistic Representations and Symbols
            </h3>
            
            <p style={{color: '#be185d', fontSize: '1.125rem', lineHeight: '1.7', textAlign: 'center', maxWidth: '60rem', margin: '0 auto 2rem auto'}}>
              Mary Magdalene has been a central figure in Christian art throughout history. She is 
              typically depicted with long flowing hair, often wearing red garments, and carrying 
              a jar of ointment or perfume. Famous artists like Giotto, Duccio, and Tilman 
              Riemenschneider have created masterpieces showing her spiritual journey.
            </p>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem'}}>
              <div style={{backgroundColor: '#fce7f3', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #ec4899'}}>
                <h4 style={{fontWeight: '600', color: '#be185d', marginBottom: '0.75rem'}}>Primary Symbols</h4>
                <ul style={{color: '#9d174d', fontSize: '0.9rem', listStyle: 'none', padding: 0, margin: 0}}>
                  <li style={{marginBottom: '0.5rem'}}>• Jar of ointment/perfume</li>
                  <li style={{marginBottom: '0.5rem'}}>• Long flowing hair</li>
                  <li style={{marginBottom: '0.5rem'}}>• Red garments</li>
                  <li style={{marginBottom: '0.5rem'}}>• Tears of repentance</li>
                </ul>
              </div>
              
              <div style={{backgroundColor: '#fce7f3', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #ec4899'}}>
                <h4 style={{fontWeight: '600', color: '#be185d', marginBottom: '0.75rem'}}>Famous Depictions</h4>
                <ul style={{color: '#9d174d', fontSize: '0.9rem', listStyle: 'none', padding: 0, margin: 0}}>
                  <li style={{marginBottom: '0.5rem'}}>• "Noli Me Tangere" scenes</li>
                  <li style={{marginBottom: '0.5rem'}}>• At the Crucifixion</li>
                  <li style={{marginBottom: '0.5rem'}}>• Penitent in the wilderness</li>
                  <li style={{marginBottom: '0.5rem'}}>• As preacher and evangelist</li>
                </ul>
              </div>
              
              <div style={{backgroundColor: '#fce7f3', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #ec4899'}}>
                <h4 style={{fontWeight: '600', color: '#be185d', marginBottom: '0.75rem'}}>Patron Saint Of</h4>
                <ul style={{color: '#9d174d', fontSize: '0.9rem', listStyle: 'none', padding: 0, margin: 0}}>
                  <li style={{marginBottom: '0.5rem'}}>• Repentant sinners</li>
                  <li style={{marginBottom: '0.5rem'}}>• Contemplatives</li>
                  <li style={{marginBottom: '0.5rem'}}>• Hairdressers</li>
                  <li style={{marginBottom: '0.5rem'}}>• Perfumers</li>
                </ul>
              </div>
            </div>

            {/* Mary Magdalene with jar image */}
            {/* <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <img 
                src="/assets/images/SMMI (1).png" 
                alt="Mary Magdalene by Donatello showing her traditional iconography"
                style={{maxWidth: '300px', width: '100%', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}
              />
              <p style={{fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic'}}>
                Mary Magdalene by Donatello (c. 1455) - showing traditional iconographic elements
              </p>
            </div> */}
          </section>

          {/* Miraculous Stories Section */}
          <section style={{marginBottom: '4rem', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', textAlign: 'center', fontFamily: 'serif'}}>Miraculous Stories and Legends</h3>
            <p style={{color: '#64748b', fontSize: '1.125rem', lineHeight: '1.7', textAlign: 'center', maxWidth: '60rem', margin: '0 auto 1.5rem auto'}}>
              According to "The Golden Legend" by Jacobus de Voragine, Mary Magdalene performed 
              several miracles during her ministry in France, including making a governor's 
              barren wife pregnant through prayer and protecting a mother and child on a 
              deserted island for two years through divine intervention.
            </p>
            
            <div style={{backgroundColor: '#f0f9ff', padding: '2rem', borderRadius: '0.75rem', margin: '1.5rem auto', maxWidth: '55rem'}}>
              <h4 style={{fontWeight: '600', color: '#0284c7', marginBottom: '1rem'}}>The Red Egg Legend</h4>
              <p style={{color: '#0369a1', fontSize: '1rem', lineHeight: '1.6'}}>
                Eastern tradition tells that Mary Magdalene went to Rome to proclaim the resurrection to Emperor Tiberius. 
                When she declared "Christ is Risen," the emperor mocked her, saying a man could no more rise from the 
                dead than the egg in her hand could turn red. Instantly, the egg turned bright red, symbolizing the 
                blood of Christ and the truth of the resurrection.
              </p>
            </div>
          </section>

          {/* Legacy Section */}
          <section style={{marginBottom: '4rem', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', textAlign: 'center', fontFamily: 'serif'}}>Legacy and Veneration</h3>
            <p style={{color: '#64748b', fontSize: '1.125rem', lineHeight: '1.7', textAlign: 'center', maxWidth: '60rem', margin: '0 auto 1.5rem auto'}}>
              Mary Magdalene has been venerated as a saint since the early Christian church. She 
              represents the model of repentance, devotion, and evangelization. Many churches and 
              religious communities worldwide are dedicated to her memory. During the Counter-Reformation, 
              the Catholic Church particularly emphasized her as a symbol of penance and transformation.
            </p>

            {/*   Image */}
            {/* <div style={{textAlign: 'center', marginTop: '2rem'}}>
              <img 
                src="/assets/images/SMMI(1).png" 
                alt="  of Mary Magdalene in Saint-Maximin-la-Sainte-Baume, France"
                style={{maxWidth: '600px', width: '100%', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}
              />
              <p style={{fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic'}}>
                  of Mary Magdalene in Saint-Maximin-la-Sainte-Baume, France - houses claimed relics of the saint
              </p>
            </div> */}

            <div style={{backgroundColor: '#fffbeb', padding: '2rem', borderRadius: '0.75rem', margin: '2rem auto', maxWidth: '55rem'}}>
              <h4 style={{fontWeight: '600', color: '#d97706', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Flower style={{width: '1.25rem', height: '1.25rem'}} />
                Fun Facts
              </h4>
              <ul style={{color: '#92400e', fontSize: '1rem', lineHeight: '1.6', listStyle: 'none', padding: 0, margin: 0}}>
                <li style={{marginBottom: '0.5rem'}}>• She is mentioned more frequently in the Gospels than most apostles</li>
                <li style={{marginBottom: '0.5rem'}}>• Her feast day was elevated to the rank of apostle by Pope Francis in 2016</li>
                <li style={{marginBottom: '0.5rem'}}>• The famous "Noli Me Tangere" scene has been painted by countless artists</li>
                <li style={{marginBottom: '0.5rem'}}>• She is the patron saint of hairdressers, perfumers, and repentant women</li>
                <li style={{marginBottom: '0.5rem'}}>• The   of Saint-Maximin houses what are claimed to be her relics</li>
                <li style={{marginBottom: '0.5rem'}}>• Her name "Magdalene" means "tower" in Hebrew</li>
              </ul>
            </div>
          </section>

          {/* Prayer Section */}
          <section style={{backgroundColor: '#e0f2fe', padding: '3rem 2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', textAlign: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1.5rem'}}>
              <Heart style={{width: '2rem', height: '2rem', color: '#0284c7'}} />
            </div>
            <h4 style={{fontWeight: '600', color: '#0284c7', marginBottom: '1.5rem', fontSize: '1.5rem', fontFamily: 'serif'}}>Prayer to Saint Mary Magdalene</h4>
            <p style={{fontSize: '1.125rem', color: '#0369a1', fontStyle: 'italic', lineHeight: '1.7', maxWidth: '50rem', margin: '0 auto'}}>
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
  );
};

export default STMaryMagdelene;
