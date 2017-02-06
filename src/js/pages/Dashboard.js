import React from 'react';

export default class Dashboard extends React.Component {

    render() {

        return <div class="container">
            <div class="sidebar">
                <h1 class="sidebar-title">Dashboard</h1>
                <ul class="nav-sidebar">
                    <li class="active">
                        <button class="accordion">
                            <i class="flaticon-database-1"></i>Datasets
                            <span>(18)</span>
                        </button>
                        <ul class="panel">
                            <li>
                                <a href="#" class="active">Dataset 01</a>
                            </li>
                            <li>
                                <a href="#">Dataset 02</a>
                            </li>
                            <li>
                                <a href="#">Dataset 03</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button class="accordion">
                            <i class="flaticon-folder-4"></i>Projects
                            <span>(1)</span>
                        </button>
                    </li>
                    <li>
                        <button class="accordion">
                            <i class="flaticon-windows-1"></i>Applications
                            <span>(2)</span>
                        </button>
                        <ul class="panel">
                            <li>
                                <a href="#" class="active">A03. Restoration of groundwater levels</a>
                            </li>
                            <li>
                                <a href="#">A05. Assessment of saltwater intrusion</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button class="accordion">
                            <i class="flaticon-controls-4"></i>Tools
                            <span>(3)</span>
                        </button>
                        <ul class="panel">
                            <li>
                                <a href="#" class="active">T09. Simple saltwater intrusion equations</a>
                            </li>
                            <li>
                                <a href="#">T03. Numerical model setup (MODFLOW)</a>
                            </li>
                            <li>
                                <a href="#">T07. Application-specific scenarios analyser</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="main">
                <a href="#">
                    <i class="flaticon-multiply"></i>
                </a>
                <h2 class="section-title">Models</h2>
                <form class="details-search">
                    <input class="form-control" placeholder="Search..." type="text"/>
                </form>
                <ul class="functions-edit">
                    <li>
                        <a href="#">
                            <i class="flaticon-add"></i>Add new</a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="flaticon-download"></i>Import</a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="flaticon-share-1"></i>Share</a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="flaticon-garbage-2"></i>Delete</a>
                    </li>
                </ul>
                <ul class="functions-public">
                    <li>
                        <a href="#">Personal</a>
                    </li>
                    <li>
                        <span>|</span>
                    </li>
                    <li>
                        <a href="#">Public</a>
                    </li>
                </ul>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Project</th>
                                <th>Application</th>
                                <th>Date created</th>
                                <th>Created by</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>MAR on Rio Primero</td>
                                <td>INOWAS</td>
                                <td>A06</td>
                                <td>24.10.2006 18:40</td>
                                <td>Ralf Junghanns</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Hanoi groundwater overexploitation</td>
                                <td>INOWAS</td>
                                <td>A03</td>
                                <td>13.06.2009 15:12</td>
                                <td>Daniela Via</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Tracer tests in Pirna Copitz</td>
                                <td>INOWAS</td>
                                <td>A14</td>
                                <td>18.07.2012 21:42</td>
                                <td>Jana Ringleb</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Study on Barranca River</td>
                                <td>AyA</td>
                                <td>A06</td>
                                <td>28.09.2016 15:39</td>
                                <td>José Bonilla</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>;
    }
}
