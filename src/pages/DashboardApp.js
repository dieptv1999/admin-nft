import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import BumpChart from "../components/chart/BumpChart";
import BarChart from "../components/chart/BarChart";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
          <Grid item className="h-[500px] w-full">
            <BumpChart data={[
              {
                "id": "Samsung Smoothtop Range",
                "data": [
                  {
                    "x": 2000,
                    "y": 3
                  },
                  {
                    "x": 2001,
                    "y": 9
                  },
                  {
                    "x": 2002,
                    "y": 11
                  },
                  {
                    "x": 2003,
                    "y": 9
                  },
                  {
                    "x": 2004,
                    "y": 7
                  }
                ]
              },
              {
                "id": "Serie 2",
                "data": [
                  {
                    "x": 2000,
                    "y": 8
                  },
                  {
                    "x": 2001,
                    "y": 2
                  },
                  {
                    "x": 2002,
                    "y": 8
                  },
                  {
                    "x": 2003,
                    "y": 3
                  },
                  {
                    "x": 2004,
                    "y": 12
                  }
                ]
              },
              {
                "id": "Serie 3",
                "data": [
                  {
                    "x": 2000,
                    "y": 2
                  },
                  {
                    "x": 2001,
                    "y": 4
                  },
                  {
                    "x": 2002,
                    "y": 12
                  },
                  {
                    "x": 2003,
                    "y": 7
                  },
                  {
                    "x": 2004,
                    "y": 1
                  }
                ]
              },
              {
                "id": "Serie 4",
                "data": [
                  {
                    "x": 2000,
                    "y": 6
                  },
                  {
                    "x": 2001,
                    "y": 5
                  },
                  {
                    "x": 2002,
                    "y": 2
                  },
                  {
                    "x": 2003,
                    "y": 1
                  },
                  {
                    "x": 2004,
                    "y": 9
                  }
                ]
              },
              {
                "id": "Serie 5",
                "data": [
                  {
                    "x": 2000,
                    "y": 5
                  },
                  {
                    "x": 2001,
                    "y": 12
                  },
                  {
                    "x": 2002,
                    "y": 4
                  },
                  {
                    "x": 2003,
                    "y": 10
                  },
                  {
                    "x": 2004,
                    "y": 4
                  }
                ]
              },
              {
                "id": "Serie 6",
                "data": [
                  {
                    "x": 2000,
                    "y": 7
                  },
                  {
                    "x": 2001,
                    "y": 10
                  },
                  {
                    "x": 2002,
                    "y": 10
                  },
                  {
                    "x": 2003,
                    "y": 5
                  },
                  {
                    "x": 2004,
                    "y": 10
                  }
                ]
              },
              {
                "id": "Serie 7",
                "data": [
                  {
                    "x": 2000,
                    "y": 10
                  },
                  {
                    "x": 2001,
                    "y": 1
                  },
                  {
                    "x": 2002,
                    "y": 7
                  },
                  {
                    "x": 2003,
                    "y": 8
                  },
                  {
                    "x": 2004,
                    "y": 11
                  }
                ]
              },
              {
                "id": "Serie 8",
                "data": [
                  {
                    "x": 2000,
                    "y": 12
                  },
                  {
                    "x": 2001,
                    "y": 11
                  },
                  {
                    "x": 2002,
                    "y": 3
                  },
                  {
                    "x": 2003,
                    "y": 2
                  },
                  {
                    "x": 2004,
                    "y": 3
                  }
                ]
              },
              {
                "id": "Serie 9",
                "data": [
                  {
                    "x": 2000,
                    "y": 4
                  },
                  {
                    "x": 2001,
                    "y": 6
                  },
                  {
                    "x": 2002,
                    "y": 5
                  },
                  {
                    "x": 2003,
                    "y": 4
                  },
                  {
                    "x": 2004,
                    "y": 6
                  }
                ]
              },
              {
                "id": "Serie 10",
                "data": [
                  {
                    "x": 2000,
                    "y": 11
                  },
                  {
                    "x": 2001,
                    "y": 8
                  },
                  {
                    "x": 2002,
                    "y": 1
                  },
                  {
                    "x": 2003,
                    "y": 11
                  },
                  {
                    "x": 2004,
                    "y": 8
                  }
                ]
              },
              {
                "id": "Serie 11",
                "data": [
                  {
                    "x": 2000,
                    "y": 1
                  },
                  {
                    "x": 2001,
                    "y": 7
                  },
                  {
                    "x": 2002,
                    "y": 6
                  },
                  {
                    "x": 2003,
                    "y": 12
                  },
                  {
                    "x": 2004,
                    "y": 2
                  }
                ]
              },
              {
                "id": "Serie 12",
                "data": [
                  {
                    "x": 2000,
                    "y": 9
                  },
                  {
                    "x": 2001,
                    "y": 3
                  },
                  {
                    "x": 2002,
                    "y": 9
                  },
                  {
                    "x": 2003,
                    "y": 6
                  },
                  {
                    "x": 2004,
                    "y": 5
                  }
                ]
              }
            ]}/>
          </Grid>
          <Grid item className="h-[800px] w-full">
            <BarChart data={[
              {
                "country": "AD",
                "hot dog": 174,
                "hot dogColor": "hsl(211, 70%, 50%)",
              },
              {
                "country": "AE",
                "hot dog": 187,
                "hot dogColor": "hsl(90, 70%, 50%)",
              },
              {
                "country": "AF",
                "hot dog": 66,
                "hot dogColor": "hsl(58, 70%, 50%)",
              },
              {
                "country": "AG",
                "hot dog": 111,
                "hot dogColor": "hsl(6, 70%, 50%)",
              },
              {
                "country": "AI",
                "hot dog": 77,
                "hot dogColor": "hsl(237, 70%, 50%)",
              },
              {
                "country": "AL",
                "hot dog": 132,
                "hot dogColor": "hsl(213, 70%, 50%)",
              },
              {
                "country": "AM",
                "hot dog": 148,
                "hot dogColor": "hsl(168, 70%, 50%)",
              },
              {
                "country": "BI",
                "hot dog": 77,
                "hot dogColor": "hsl(237, 70%, 50%)",
              },
              {
                "country": "BL",
                "hot dog": 132,
                "hot dogColor": "hsl(213, 70%, 50%)",
              },
              {
                "country": "BM",
                "hot dog": 148,
                "hot dogColor": "hsl(168, 70%, 50%)",
              },
              {
                "country": "CD",
                "hot dog": 174,
                "hot dogColor": "hsl(211, 70%, 50%)",
              },
              {
                "country": "CE",
                "hot dog": 187,
                "hot dogColor": "hsl(90, 70%, 50%)",
              },
              {
                "country": "CF",
                "hot dog": 66,
                "hot dogColor": "hsl(58, 70%, 50%)",
              },
              {
                "country": "CG",
                "hot dog": 111,
                "hot dogColor": "hsl(6, 70%, 50%)",
              },
              {
                "country": "CI",
                "hot dog": 77,
                "hot dogColor": "hsl(237, 70%, 50%)",
              },
              {
                "country": "CL",
                "hot dog": 132,
                "hot dogColor": "hsl(213, 70%, 50%)",
              },
              {
                "country": "CM",
                "hot dog": 148,
                "hot dogColor": "hsl(168, 70%, 50%)",
              },
              {
                "country": "CI",
                "hot dog": 77,
                "hot dogColor": "hsl(237, 70%, 50%)",
              },
              {
                "country": "CL",
                "hot dog": 132,
                "hot dogColor": "hsl(213, 70%, 50%)",
              },
              {
                "country": "CM",
                "hot dog": 148,
                "hot dogColor": "hsl(168, 70%, 50%)",
              }
            ]}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
