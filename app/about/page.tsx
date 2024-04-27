'use client'
import React, { useState } from 'react';
import styles from '../Styles/_about.module.scss'
import { Collapse } from 'reactstrap';
import { CompanyIconLight, DateIconLight, LocationIconLight } from '../Components/SVGs/SVGIcons';

interface PageProps { }

const Page: React.FC<PageProps> = () => {
  const [isOpen1, setIsOpen1] = useState(false)
  return (
    <div className={styles.about}>
      <section className={styles.about_top}>
        <h2 className={`app-heading ${styles.about_heading}`}>About</h2>
        <p className={styles.about_desc}>The Generator App is an online tool that helps you to export ready-made templates ready to work as your future website. It helps you to combine slides, panels and other components and export it as a set of static files: HTML/CSS/JS.</p>
      </section>

      <section className={styles.work_experience}>
        <h2 className={`app-heading ${styles.about_heading}`}>Work Experience</h2>

        <div className={styles.work_experience_container}>
          <div className={styles.work_experience_item}>
            <div onClick={() => { setIsOpen1(!isOpen1) }} className={styles.work_experience_top}>
              <div className={styles.work_experience_top_left}>
                <h6>Junior Web Developer</h6>
                <div className={styles.work_experience_top_detail}>
                  <div className={styles.work_experience_company}>
                    <CompanyIconLight />
                    <p className='mb-0'>Xown Web Solutions</p>
                  </div>
                  <div className={styles.work_experience_location}>
                    <LocationIconLight />
                    <p className='mb-0'>Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
              <div className={styles.work_experience_top_right}>
                <div className='tag-success'>Full Time</div>
                <div className={styles.work_experience_date}>

                  <p className='mb-0 d-flex align-items-center gap-3'><DateIconLight /> Sep 2021</p> - <p className='mb-0'>Dec 2021</p>
                </div>
              </div>
            </div>
            <Collapse isOpen={isOpen1}>
              <div className={styles.work_experience_body}>
                <p className={styles.work_experience_intro}>
                  Infohub is a Nigerian-based firm specializing in securing software contracts
                  from clients and proficiently delivering software solutions. Extending to the
                  maintenance and management of ongoing client projects, ensuring sustained
                  excellence in project outcomes and client satisfaction
                </p>
                <div className={styles.work_experience_tools}>
                  Skills:
                </div>
                <ul className={styles.work_experience_detail}>
                  <li className={styles.work_experience_detail_item}>
                    Led the design and development of software applications.
                  </li>
                  <li className={styles.work_experience_detail_item}>
                    Created and maintained detailed project documentation to effectively track
                    project progress and foster collaboration
                  </li>
                  <li className={styles.work_experience_detail_item}>
                    Swiftly and efficiently identified and resolved project issues, minimizing
                    their impact on project timelines.

                  </li>
                  <li className={styles.work_experience_detail_item}>
                    Formulated a comprehensive project plan delineating key tasks and
                    milestones
                  </li>
                  <li className={styles.work_experience_detail_item}>
                    Conducted client meetings to gather software requirements and provided
                    regular updates on progress or address any bottlenecks in a professional
                    manner.
                  </li>
                  <li className={styles.work_experience_detail_item}>
                    Assisted in troubleshooting issues and delegated tasks to the appropriate
                    team members
                  </li>
                  <li className={styles.work_experience_detail_item}>
                    Managed meeting schedules, sent reminder emails to all participants, and
                    coordinated meeting logistics.
                  </li>

                </ul>
              </div>
            </Collapse>
          </div>
        </div>
      </section>
      <section className={styles.education}>
        <h2 className={`app-heading ${styles.about_heading}`}>Education</h2>

        <div className={styles.work_experience_container}>
          <div className={styles.work_experience_item}>
            <div className={styles.work_experience_top}>
              <div className={styles.work_experience_top_left}>
                <h6>Bachelor in Computer Science and Engineering</h6>
                <div className={styles.work_experience_top_detail}>
                  <div className={styles.work_experience_company}>
                    <CompanyIconLight />
                    <p className='mb-0'>Obafemi Awolowo University</p>
                  </div>
                </div>
              </div>
              <div className={styles.work_experience_top_right}>
                <div className='tag-success'>Full Time</div>
                <div className={styles.work_experience_date}>

                  <p className='mb-0 d-flex align-items-center gap-3'><DateIconLight /> Sep 2021</p> - <p className='mb-0'>Dec 2021</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className={styles.certifications}>
        <h2 className={`app-heading ${styles.about_heading}`}>Certifications</h2>

        <div className={styles.work_experience_container}>
          <div className={styles.work_experience_item}>
            <div className={styles.work_experience_top}>
              <div className={styles.work_experience_top_left}>
                <h6>Full Stack Development Front to Back by Helene</h6>
                <div className={styles.work_experience_top_detail}>
                  <div className={styles.work_experience_company}>
                    <CompanyIconLight />
                    <p className='mb-0'>Udemy</p>
                  </div>
                </div>
              </div>
              <div className={styles.work_experience_top_right}>
                <div className='tag-success'>Full Time</div>
                <div className={styles.work_experience_date}>

                  <p className='mb-0 d-flex align-items-center gap-3'><DateIconLight /> Sep 2021</p> - <p className='mb-0'>Dec 2021</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


    </div>
  );
}

export default Page;